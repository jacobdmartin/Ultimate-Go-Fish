import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from '.././App'

describe('LoginView', () => {
  it('renders the LoginView', () => {
    const { getByText } = render(<App />)
    const nameInput = getByText(/Enter Your Name:/i)
    expect(nameInput).toBeInTheDocument()
  })

  // describe("Login Form", () => {
  //   describe("submits for with correct data", () => {
  //     it("should move to the GameView", () => {
  //       const wrapper = render(<App />)
  //       const nameInput = wrapper.getByTestId("name-input")
  //       const numberInput = wrapper.getByTestId("number-input")
  //       fireEvent.change(nameInput, { target: { value: 'Bob' } })
  //       fireEvent.change(numberInput, { target: { value: '3' } })
  //       fireEvent.click(wrapper.getByText(/Submit/i))
  //       const bob = wrapper.getByText("Bob")
  //       expect(bob).toBeInTheDocument()
  //     })
  //   })
  //
  //   describe("submits for with incorrect data", () => {
  //     it("should block user from advancing due to invalid name", () => {
  //       const wrapper = render(<App />)
  //       const nameInput = wrapper.getByTestId("name-input")
  //       const numberInput = wrapper.getByTestId("number-input")
  //       fireEvent.change(numberInput, { target: { value: "" } })
  //       fireEvent.change(numberInput, { target: { value: "2" } })
  //       fireEvent.click(wrapper.getByText(/Submit/i))
  //       expect(numberInput).toBeInTheDocument()
  //     })
  //
  //     it("should block user from advancing due to invalid number of bots", () => {
  //       const wrapper = render(<App />)
  //       const nameInput = wrapper.getByTestId("name-input")
  //       const numberInput = wrapper.getByTestId("number-input")
  //       fireEvent.change(nameInput, { target: { value: 'Eliot' } })
  //       fireEvent.change(numberInput, { target: { value: 0 } })
  //       fireEvent.click(wrapper.getByText(/Submit/i))
  //       const errorText = wrapper.getByText("Please fill out this field")
  //       expect(errorText).toBeInTheDocument()
  //     })
  //   })
  // })
})
