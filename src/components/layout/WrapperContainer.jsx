import React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_960SCREEN, ROUTE_1920SCREEN } from '../../utilities/utilitiesText';
import Container from '../Wrapper/Container';
import ContentWrapper from '../Wrapper/ContentWrapper';
import Wrapper1920 from '../Wrapper/Wrapper1920';

export default function WrapperContainer({ children }) {
    const location = useLocation();
    const pathName = location.pathname.split('/');
    return (
        <>
            {ROUTE_1920SCREEN.some((obj) => obj.pathname === `/${pathName[1]}`) ? (
                <Wrapper1920>
                    {/* -----this wrapper will be used for 1920px screen----- */}
                    {children}
                </Wrapper1920>
            ) : ROUTE_960SCREEN.some((obj) => obj.pathname === location.pathname) ? (
                <ContentWrapper>
                    {/* -----this wrapper will be used for 960px screen----- */}
                    {children}
                </ContentWrapper>
            ) : (
                <Container>
                    {/* -----this container will be used for 1440px----- */}
                    {children}
                </Container>
            )}
        </>
    );
}
