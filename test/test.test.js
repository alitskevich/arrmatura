import test from '../test/test.js'
import '../test/xml.test.js'
import '../test/utils.test.js'

test(({assert, run, describe}) => run(
  class SelfTest {
    assert () {
      describe('describe assert test case')
      assert(1, 'number 1 should be asserted')
      // assert(0, 'it should be bad')
    }
  }
))
