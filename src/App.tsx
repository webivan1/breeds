import React, { FC } from 'react'
import { ThemeProvider } from 'react-bootstrap'
import { MainLayout } from '@/components/layout/MainLayout'
import { BreedImages } from '@/components/breedImages/BreedImages'

export const App: FC = () => (
  <ThemeProvider>
    <MainLayout>
      <BreedImages />
    </MainLayout>
  </ThemeProvider>
)
