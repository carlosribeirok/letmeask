import styled from 'styled-components';

export const Container = styled.div`
    color: ${props => props.theme.colors.label}; 
    display: flex;
    align-items: center;
    padding: 0 30px;
    position: fixed;
    top: 50px;
    right: 80px;
`;