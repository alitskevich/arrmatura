import test from './test.js'
import { get } from '../lib/index.js'

const SAMPLE = {
  $: {
    a: 1,
    b: {
      c: 2
    }
  }
}

test(({assert, run, describe}) => run(
  class Utils {
    get () {
      describe('dot get')
      assert.equal(get(SAMPLE, 'a'), 1, 'should be the same')
      assert.equal(get(SAMPLE, 'b.c'), 2, 'should be the same')
      assert.equal(get(SAMPLE, 'b.n'), undefined, 'should be undefined')
      assert.equal(get(SAMPLE, 'n'), undefined, 'should be undefined')
      assert.equal(get(SAMPLE, 'n.n.n'), undefined, 'should be undefined')
    }
  }
))
