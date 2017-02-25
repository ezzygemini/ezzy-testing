($ => {

  // Disable logger and enable current logger.
  window.logger._silent = true;
  window.stack = [];

  const start = new Date();

  const $body = $('body');
  const events = 'click keyup select';

  if (window.growStack) {
    $body.off(events, window.growStack);
  }

  const duration = (startDate, endDate) => {
    let ms = sleep(startDate, endDate);
    let hr = 0;
    let min = 0;
    let sec = 0;
    if (hr > 3.6e+6) {
      min = Math.floor(ms / 3.6e+6);
      ms = ms % 3.6e+6;
    }
    if (ms > 60000) {
      min = Math.floor(ms / 60000);
      ms = ms % 60000;
    }
    if (ms > 1000) {
      sec = Math.floor(ms / 1000);
    }
    hr = ('0' + hr).substr(-2);
    min = ('0' + min).substr(-2);
    sec = ('0' + sec).substr(-2);
    return `${hr}:${min}:${sec}`;
  };

  const sleep = (startDate, endDate) => {
    return endDate.getTime() - startDate.getTime();
  };

  class E {
    constructor(event) {
      this.event = event;

      const now = new Date();
      this.time = now;

      const $el = $(event.target);
      this.xpath = $el.getXPath().toLowerCase();
      this.type = event.type;

      const prevTime = stack.length ? stack[stack.length - 1].time : start;
      const dur = duration(start, now);
      this.idle = duration(prevTime, now);
      this.sleep = sleep(prevTime, now);

      this.id = event.target.id;
      this.cls = ($el.attr('class') || '')
        .split(' ').filter(c => !/^ng-.*/.test(c)).join(' ');

      let attr;
      for (let cls of ['testid', 'data-testid']) {
        attr = $el.attr(cls);
        if (attr) {
          this.testid = `[${cls}=${attr}]`;
          break;
        }
      }

      this.tag = event.target.tagName.toLowerCase();

      this.selector = this.tag;
      if (this.testid) {
        this.selector += this.testid;
      } else if (this.id) {
        this.selector += '#' + this.id;
      } else if (this.cls) {
        this.selector += '.' + this.cls.split(' ').join('.');
      } else {
        this.selector = this.xpath.split('/').slice(1).join(' > ')
          .replace(/\[(\d+)\]/g, (a, b) => `:nth-child(${b})`);
      }

      this.string =
        `[${dur}/${this.idle} ${this.type} ${this.selector}`;

      let txt = $.trim($el.val() || $el.text());
      if (txt && !/\n/.test(txt)) {
        txt = txt.length < 50 ? txt : txt.substr(0, 50) + '...';
        this.string += `  |  '${txt}'`;
      }

      let action;
      switch (this.type) {
        case 'keyup':
          action = `.sendKeys('${String.fromCharCode(event.which)}')`;
          break;
        default:
          action = `.click()`;
      }
      this.promise = $.trim(`
        browser.sleep(${this.sleep});
        .then($('${this.selector}')${action};
      `).replace(/\n\s*/g, '');

    }
  }

  const logStack = () => {
    console.clear();
    console.log(window.stack);
    console.log(JSON
      .stringify(window.stack.map(item => item.string), null, 4));
    console.log(window.stack.reduce((a, b) => a + '\n' + b.promise, ''));
  };

  logStack();

  window.growStack = event => {
    window.stack.push(new E(event));
    logStack();
  };

  $body.on(events, window.growStack);

  /**
   * Creates an XPath from a node
   * (currently not used inside this Class
   * (instead FormHTML.prototype.generateName is used) but will be in future);
   *
   * @param  {string=} rootNodeName  if absent the root is #document
   * @return {string}                 XPath
   */
  $.fn.getXPath = function (rootNodeName) {
    //other nodes may have the same XPath but because this
    // function is used to determine the corresponding input
    // name of a data node, index is not included
    let position;
    let $node = this.first();
    let nodeName = $node.prop('nodeName');
    let $sibSameNameAndSelf = $node.siblings(nodeName).addBack();
    let steps = [];
    let $parent = $node.parent();
    let parentName = $parent.prop('nodeName');

    position = ($sibSameNameAndSelf.length > 1) ?
      '[' + ($sibSameNameAndSelf.index($node) + 1) + ']' : '';
    steps.push(nodeName + position);

    while (
    $parent.length == 1 && parentName !== rootNodeName &&
    parentName !== '#document'
      ) {
      $sibSameNameAndSelf = $parent.siblings(parentName).addBack();
      position = ($sibSameNameAndSelf.length > 1) ?
        '[' + ($sibSameNameAndSelf.index($parent) + 1) + ']' : '';
      steps.push(parentName + position);
      $parent = $parent.parent();
      parentName = $parent.prop('nodeName');
    }
    return '/' + steps.reverse().join('/');
  };

})(jQuery);
