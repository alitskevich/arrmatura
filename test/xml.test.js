import test from './test.js'
import { parseXML } from '../lib/index.js'
const SAMPLE = `
<block if="isEmpty">
  <then>
    <small class="empty">
      :emptyMessage
    </small>
  </then>
  <else>
    Total
  </else>
</block>
`
test(({assert, run, describe}) => run(
  class XML {
    constructor () {
      this.root = parseXML(SAMPLE)
    }
    root () {
      describe('having parsed root XML')
      assert(this.root, 'root should be not empty')
    }
    attributes () {
      describe('XML attributes')
      assert.equal(this.root.subs[0].subs[0].attrs.get('class'), 'empty', 'attribute', this.root)
      assert.equal(this.root.subs[1].attrs.get('#text'), 'Total', '#text', this.root)
    }
    stringify () {
      describe('parse and stringify XML')
      assert.equal(this.root.toString(), SAMPLE.trim(), 'root.toString() should be equal to trimmed SAMPLE', this.root)
    }
  }
))
