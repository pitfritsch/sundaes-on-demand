import { useState } from "react"
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap"

export default function SummaryForm() {
  const [agreed, setAgreed] = useState(false)

  return(
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type='checkbox'
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          label={
            <span>
              I agree to 
                <OverlayTrigger overlay={
                  <Tooltip>No ice cream will actually be delivered</Tooltip>
                }>
                  <span style={{ color: 'blue' }}>Terms and Conditions</span> 
                </OverlayTrigger>
            </span>
          }
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!agreed}>
        Confirm order
      </Button>
    </Form>
  )
}