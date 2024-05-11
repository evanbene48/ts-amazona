import Alert from 'react-bootstrap/Alert'

function MessageBox({
  variant,
  children,
}: {
  variant?: string
  children: React.ReactNode
}) {
  return <Alert variant={variant || 'info'}>{children}</Alert>
}
export default MessageBox
