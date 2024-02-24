import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'roboto Mono', monospace;
  font-size: 1rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
    font-size: 15vw;
  }

  @media (max-width: 720px) {
    gap: 0.5rem;
  }
`

export const Separator = styled.div`
  padding: 2rem;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media (max-width: 720px) {
    width: 1rem;
    padding: 15vw 0.5rem;
    color: ${(props) => props.theme['gray-800']};
  }
`
