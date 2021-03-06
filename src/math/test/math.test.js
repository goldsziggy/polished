// @flow
import math from '../math'

describe('math', () => {
  it('should be able to do simple addition', () => {
    expect(math('1rem + 2rem')).toEqual(`${1 + 2}rem`)
    expect(math('1rem + 2')).toEqual(`${1 + 2}rem`)
    expect(math('1em + 5em')).toEqual(`${1 + 5}em`)
    expect(math('1em + -5em')).toEqual(`${1 + -5}em`)
    expect(math('1in + 5in + 10')).toEqual(`${1 + 5 + 10}in`)
  })

  it('should be able to do simple subtraction', () => {
    expect(math('1rem - 2rem')).toEqual(`${1 - 2}rem`)
    expect(math('1rem - 2')).toEqual(`${1 - 2}rem`)
    expect(math('1em - 5em')).toEqual(`${1 - 5}em`)
    expect(math('1em - -5em')).toEqual(`${1 - -5}em`)
    expect(math('1in - 5in - 10')).toEqual(`${1 - 5 - 10}in`)
  })

  it('should be able to do simple multiplication', () => {
    expect(math('1rem * 2rem')).toEqual(`${1 * 2}rem`)
    expect(math('1rem * 2')).toEqual(`${1 * 2}rem`)
    expect(math('1em * 5em')).toEqual(`${1 * 5}em`)
    expect(math('1em * -5em')).toEqual(`${1 * -5}em`)
    expect(math('1in * 5in * 10')).toEqual(`${1 * 5 * 10}in`)
  })

  it('should be able to do simple division', () => {
    expect(math('1rem / 2rem')).toEqual(`${1 / 2}rem`)
    expect(math('1rem / 2')).toEqual(`${1 / 2}rem`)
    expect(math('1em / 5em')).toEqual(`${1 / 5}em`)
    expect(math('1em / -5em')).toEqual(`${1 / -5}em`)
    expect(math('1in / 5in / 10')).toEqual(`${1 / 5 / 10}in`)
  })

  it('should be able to do simple min', () => {
    expect(math('min(3em, 4em, 1em, 2em)')).toEqual(`${Math.min(3, 4, 1, 2)}em`)
    expect(math('min(3em, -4em, 1em, 2em)')).toEqual(
      `${Math.min(3, -4, 1, 2)}em`,
    )
  })

  it('should be able to do simple max', () => {
    expect(math('max(3em, 8em, 1em, 2em)')).toEqual(`${Math.max(3, 8, 1, 2)}em`)
    expect(math('max(3em, -8em, 1em, 2em)')).toEqual(
      `${Math.max(3, -8, 1, 2)}em`,
    )
  })

  it('should be able to do simple factorial', () => {
    expect(math('3em!')).toMatchSnapshot()
    expect(math('171em!')).toMatchSnapshot()
    expect(math('0px!')).toMatchSnapshot()
    expect(math('-0.5px!')).toMatchSnapshot()
    expect(math('-5px!')).toMatchSnapshot()
  })

  it('should be able to process square root', () => {
    expect(math('sqrt(4em)')).toEqual(`${Math.sqrt(4)}em`)
    expect(math('sqrt(-4em)')).toEqual(`${Math.sqrt(-4)}em`)
    expect(math('sqrt(2em + 4em)')).toEqual(`${Math.sqrt(2 + 4)}em`)
    expect(math('sqrt(4em / 2em)')).toEqual(`${Math.sqrt(4 / 2)}em`)
    expect(math('sqrt(4em + 2em * 5)')).toEqual(`${Math.sqrt(4 + 2 * 5)}em`)
    expect(math('sqrt(4em - 2 / 5em)')).toEqual(`${Math.sqrt(4 - 2 / 5)}em`)
  })

  it('should be able to process exponent power', () => {
    expect(math('2em^3')).toEqual(`${2 ** 3}em`)
  })

  it('should be able to process parentheses', () => {
    expect(math('(1rem + 2rem) * 5')).toEqual(`${(1 + 2) * 5}rem`)
    expect(math('(4em + 2)  * 5em + sqrt(4em - 2 / 5em)')).toEqual(
      `${(4 + 2) * 5 + Math.sqrt(4 - 2 / 5)}em`,
    )
  })

  it('should throw an error when formula contains multiple units', () => {
    expect(() => {
      math('1vw + 1vh + 1pt')
    }).toThrow(
      'All values in a formula must have the same unit or be unitless.',
    )
  })

  it('should throw an error when formula is missing a closing parenthesis', () => {
    expect(() => {
      math('(1px + 2px * 3')
    }).toThrow('Formula is missing closing parenthesis at 10')
  })

  it('should throw an error when formula has an extra closing parenthesis', () => {
    expect(() => {
      math('(1px + 2px) * 3)')
    }).toThrow('Formula has too many closing parentheses at 11')
  })

  it('should throw an error when formula has no opening parenthesis', () => {
    expect(() => {
      math('1px + 2px) * 3')
    }).toThrow('Formula has too many closing parentheses at 5')
  })

  it('should throw an error when a function has no opening parenthesis', () => {
    expect(() => {
      math('1px + sqrt 4')
    }).toThrow('Formula contains a function that needs parentheses at 9')
  })

  it('should throw an error when passed a non-formula string', () => {
    expect(() => {
      math("eval('1+2+3')")
    }).toThrow('Syntax Error at 0')
  })
})
