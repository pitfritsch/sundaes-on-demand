import { Col, Form, Row } from 'react-bootstrap'

export default function ToppingOption({ name, imagePath, updateItemCount }) {

  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0)
  }

  return (
    <Col 
      xs={12} sm={6} md={4} lg={3}
      style={{ textAlign: 'center' }}
    >
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-checkbox`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs='6'>{name}</Form.Label>
        <Col xs='5'>
          <Form.Control
            type='checkbox'
            onChange={handleChange}
            label={name}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}