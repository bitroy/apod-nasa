import React from 'react'
import '@testing-library/jest-dom'
import styles from './Header.module.css'
import { render, screen } from '@testing-library/react'

import Header from './Header'

describe('Always Show Header',  () => {
    test('Verify Header Text', () => {
        render(<Header />)
        expect(screen.getByText("Astronomy Picture of the Day")).toBeInTheDocument()
    })

    test('Verify Header is Center Aligned', () => {
        render(<Header />)
        expect(screen.getByText("Astronomy Picture of the Day")).toHaveClass(`${styles.header}`)
    })
})