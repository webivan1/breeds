import React, { FC } from 'react'
import styles from './ImageItem.module.scss'

type PropType = {
  url: string
}

export const ImageItem: FC<PropType> = ({ url }) => (
  <div
    data-testid="image"
    className={styles.image}
    style={{ backgroundImage: `url(${url})` }}
  />
)
