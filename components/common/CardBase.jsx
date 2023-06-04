import { Card } from 'antd'
import React from 'react'

function CardBase({children}) {
  return (
    <Card title={false} bordered={false} style={{ width: 300, boxShadow:'0 0 5px 3px #eaeaea' }}>
      {children}
    </Card>
  )
}

export default CardBase