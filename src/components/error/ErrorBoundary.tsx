import React, { Component, ReactNode } from 'react'
import { Alert } from 'react-bootstrap'

type PropType = {
  children: ReactNode
}

type StateType = {
  hasError: boolean
}

export class ErrorBoundary extends Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.dir(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <Alert variant="danger">Something went wrong</Alert>
    }

    return this.props.children
  }
}
