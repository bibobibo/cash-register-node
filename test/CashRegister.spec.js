import CashRegister from '../src/CashRegister'
import Item from '../src/Item'
import Purchase from '../src/Purchase'
import StubPurchase from './StubPurchase'
import Printer from '../src/Printer'
import MockPrinter from './MockPrinter'
import {stub, mock} from 'sinon'
import assert from 'assert'

describe('CashRegister', () => {
  it('should print the real purchase', () => {
    // initialize CashRegister and fake Printer

    // cashRegister.process(purchase);

    // verify that printer was called

    // const printer = new Printer()
    // const cashRegister = new CashRegister(printer)

    // const itemOne = new Item('apple', 5)
    // const itemTwo = new Item('banana', 3)
    // const purchase = new Purchase([itemOne, itemTwo])

    // cashRegister.process(purchase)
  })

  it('should process using sinon', () => {
    const printer = new Printer()
    const purchase = new Purchase([])
    const mockedPurchase = mock(purchase)

    stub(printer, 'print')
    mockedPurchase.expects('asString').once().returns('mocked string')

    const cashRegister = new CashRegister(printer)
    cashRegister.process(purchase)

    assert(printer.print.calledOnce)
    mockedPurchase.verify()
  })

  it('should process the real purchase with mocked printer', () => {
    const printer = new MockPrinter()
    const cashRegister = new CashRegister(printer)

    const itemOne = new Item('apple', 5)
    const itemTwo = new Item('banana', 3)
    const purchase = new Purchase([itemOne, itemTwo])

    cashRegister.process(purchase)
    
    printer.verifyIsCalled()
    printer.verifyIsCalledWith(`apple\t5\nbanana\t3\n`)
  })

  it('should process the stubed purchase with mocked printer', () => {
    const printer = new MockPrinter()
    const cashRegister = new CashRegister(printer)

    const purchase = new StubPurchase('stubed as string result')

    cashRegister.process(purchase)
    
    printer.verifyIsCalled()
    printer.verifyIsCalledWith('stubed as string result')
  })
})
