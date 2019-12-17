import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '.././App'
import Game from '.././Game.js'
import Player from '.././Player.js'
import GameView from '.././GameView.js'


describe('GameView', () => {
  it('shows the game page', () => {
    const wrapper = render(<App />)
    const nameInput = wrapper.getByTestId("name-input")
    const numberInput = wrapper.getByTestId("number-input")
    fireEvent.change(nameInput, { target: { value: 'Bob' } })
    fireEvent.change(numberInput, { target: { value: '3' } })
    fireEvent.click(wrapper.getByText(/Submit/i))
    const bob = wrapper.getByText("Bob")
    expect(bob).toBeInTheDocument()
  })
  // describe('where a card is selected', () => {
  //   it('should display a box shadow and green text', () => {
  //     const wrapper = render(<App />)
  //     const nameInput = wrapper.getByTestId("name-input")
  //     const numberInput = wrapper.getByTestId("number-input")
  //     fireEvent.change(nameInput, { target: { value: 'Bob' } })
  //     fireEvent.change(numberInput, { target: { value: '3' } })
  //     fireEvent.click(wrapper.getByText(/Submit/i))
  //     const bob = wrapper.getByText("Bob")
  //   })
  // })
  //
  // describe('where a player is selected', () => {
  //   it('should display a box shadow and green text', () => {
  //     const quinn = new Player("Quinn")
  //     const number = 1
  //     const game = new Game(quinn, number)
  //     const view = new GameView(game)
  //     const container = document.createElement('div')
  //     document.body.appendChild(container)
  //     view.draw(container)
  //     const playerButton = document.querySelectorAll('li[type="button"]')
  //     playerButton[1].click()
  //
  //     expect(playerButton[1].style["color"]).toEqual("green")
  //     expect(playerButton[0].style["color"]).toEqual("")
  //     container.remove()
  //   })
  // })
})
