import { Link } from 'react-router-dom';
import { Title } from '../Title/Title';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Title size="68px">
				<Link to="/">Quiz</Link>
			</Title>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	width: 100%;
	height: 150px;
	text-align: center;
`;
