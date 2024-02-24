import styled from 'styled-components'

export const LayoutContainer = styled.div`
  width: auto;
  height: auto;
  min-height: 100vh;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`
