import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { BrowserRouter } from 'react-router-dom';

test('Test Navbar link', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});

test('Test Footer link', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>);
  const linkElement = screen.getByText('Copyright 2021 © Group 20 All Rights Reserved.');
  expect(linkElement).toBeInTheDocument();
});

test('Test button node', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>);
  const linkElement = screen.getAllByRole('button')[0];
  expect(linkElement).toBeInTheDocument();
});