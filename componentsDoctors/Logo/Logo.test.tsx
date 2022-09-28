import React from 'react'
import { render, screen } from '@testing-library/react'

import Logo from '.'

describe('Logo', () => {
  it('', () => {
    render(<Logo />)

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument()
  })
})
