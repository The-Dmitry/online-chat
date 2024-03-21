import NodeCreator from '../common/nodeCreator/NodeCreator';
import View from '../common/view/View';

export default class WinnersView extends View {
  constructor() {
    super({
      tag: 'div',
      css: ['winners'],
    });
    this.render();
  }

  private render() {
    const text = new NodeCreator({
      tag: 'p',
      text: 'WINNERS',
    });
    this.addNodeInside(text);
  }
}
