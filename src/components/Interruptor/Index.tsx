import React, { useContext } from "react";
import Switch from "react-switch";

import { ThemeContext } from "styled-components";
import { Container } from './styles';

interface Props {
    toggleTheme(): void;
}

const Interruptor: React.FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext);

    return (
        <Container>
            Dark Theme &nbsp;
            <Switch 
                onChange={toggleTheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={colors.primary}
                onColor={colors.secundary}
                offHandleColor='#835afd'
                onHandleColor='#FFF'
            />
        </Container>
    );
};

export default Interruptor;