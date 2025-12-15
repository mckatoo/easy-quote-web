import styled from 'styled-components';
import colors from '../../colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  color: #333;
`;

export const LoginContainer = styled.div`
  display: flex;
  width: 900px;
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 950px) {
    width: 95%;
    height: auto;
    flex-direction: column;
  }
  
  @media (max-width: 500px) {
    border-radius: 10px;
  }
`;

export const LeftSide = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #2c3e50, #4a6491);
  color: white;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 950px) {
    padding: 40px 30px;
  }
  
  @media (max-width: 500px) {
    padding: 30px 20px;
  }
`;

export const RightSide = styled.div`
  flex: 1;
  background-color: white;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  
  @media (max-width: 950px) {
    padding: 40px 30px;
  }
  
  @media (max-width: 500px) {
    padding: 30px 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  /* margin-bottom: 30px; */
`;

export const LogoIcon = styled.div`
  font-size: 32px;
  margin-right: 15px;
  color: #4CAF50;
`;

export const LogoText = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

export const SystemTitle = styled.h2`
  font-size: 22px;
  /* margin-bottom: 30px; */
  font-weight: 600;
`;

export const FeaturesList = styled.ul`
  list-style-type: none;
  /* margin-bottom: 40px; */
`;

export const FeatureItem = styled.li`
  /* margin-bottom: 15px; */
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const FeatureIcon = styled.i`
  margin-right: 12px;
  color: #4CAF50;
  font-size: 18px;
`;

export const VersionInfo = styled.div`
  margin-top: auto;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

export const LoginTitle = styled.h1`
  font-size: 28px;
  /* margin-bottom: 10px; */
  color: #2c3e50;
  font-weight: 700;
  text-align: center;
`;

export const LoginSubtitle = styled.p`
  color: #7f8c8d;
  /* margin-bottom: 40px; */
  font-size: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

export const GeneralError = styled.div`
  color: ${colors.red500};
  font-size: 14px;
  max-height: 40px;
  position: absolute;
  top: 0;
  right: 0;
`

export const InputError = styled.div`
  color: ${colors.red500};
  font-size: 14px;
  text-align: right;
  position: relative;
  top: -56px;
  right: 4px;
  height: 0;
`

export const FormGroup = styled.div`
  /* margin-bottom: 25px; */
`;

export const FormLabel = styled.label`
  display: block;
  /* margin-bottom: 8px; */
  color: #555;
  font-weight: 600;
`;

export const InputWithIcon = styled.div`
  position: relative;
`;

export const InputIcon = styled.i`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 1px solid ${props => props.$hasError ? '#e74c3c' : '#ddd'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#e74c3c' : '#4CAF50'};
    box-shadow: 0 0 0 2px ${props => props.$hasError ? 'rgba(231, 76, 60, 0.2)' : 'rgba(76, 175, 80, 0.2)'};
  }
`;

export const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 30px; */
  font-size: 14px;
  
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const Remember = styled.div`
  display: flex;
  align-items: center;
  
  input {
    margin-right: 8px;
  }
`;

export const ForgotPassword = styled.a`
  color: #3498db;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  /* margin-bottom: 25px; */
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  text-align: center;
  /* margin-bottom: 25px; */
  position: relative;
  color: #95a5a6;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #eee;
  }
  
  span {
    background-color: white;
    padding: 0 15px;
    position: relative;
  }
`;

export const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  /* margin-bottom: 30px; */
  
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

export const SocialIcon = styled.div<{ platform: 'facebook' | 'google' | 'linkedin' }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s;
  background-color: ${props => 
    props.platform === 'facebook' ? '#3b5998' : 
    props.platform === 'google' ? '#dd4b39' : '#0077b5'};
  
  &:hover {
    transform: translateY(-3px);
  }
`;

export const SignupLink = styled.div`
  text-align: center;
  font-size: 15px;
  color: #7f8c8d;
`;

export const SignupLinkAnchor = styled.a`
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;
