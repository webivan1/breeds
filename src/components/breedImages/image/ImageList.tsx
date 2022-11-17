import React, { FC } from 'react'
import { Row, Col } from 'react-bootstrap'
import { ImageItem } from '@/components/breedImages/image/ImageItem'

type PropType = {
  images: string[]
}

export const ImageList: FC<PropType> = ({ images }) => (
  <Row data-testid="images" className="align-items-top mt-5">
    {images.map((image) => (
      <Col key={image} md={2} sm={6} className="mb-4">
        <ImageItem key={image} url={image} />
      </Col>
    ))}
  </Row>
)
