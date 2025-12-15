import { FaUser, FaLock, FaFileInvoiceDollar, FaCheckCircle, FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { useState } from 'react';
import * as S from './styles';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

export default () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name as keyof LoginErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Usuário é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validação simulada (em um sistema real, isso seria feito no backend)
      if (formData.username === 'admin' && formData.password === '1234') {
        alert('Login realizado com sucesso! Redirecionando para o sistema...');
        // Em uma aplicação real, você redirecionaria para a página principal
        // navigate('/dashboard');
      } else {
        setErrors({
          general: 'Usuário ou senha incorretos'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Erro ao fazer login. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    alert(`Login com ${platform} será implementado em versões futuras.`);
  };

  const handleForgotPassword = () => {
    alert('Um link de recuperação de senha será enviado para o e-mail cadastrado.');
  };

  const handleSignupRequest = () => {
    alert('Para solicitar acesso ao sistema, entre em contato com o administrador.');
  };

  return (
    <S.Container>
      <S.LoginContainer>
        <S.LeftSide>
          <S.Logo>
            <S.LogoIcon>
              <FaFileInvoiceDollar />
            </S.LogoIcon>
            <S.LogoText>Orçamentos</S.LogoText>
          </S.Logo>

          <S.SystemTitle>Sistema de Gestão de Orçamentos</S.SystemTitle>

          <S.FeaturesList>
            <S.FeatureItem>
              <S.FeatureIcon><FaCheckCircle /></S.FeatureIcon>
              Gerenciamento de clientes
            </S.FeatureItem>
            <S.FeatureItem>
              <S.FeatureIcon><FaCheckCircle /></S.FeatureIcon>
              Criação de orçamentos detalhados
            </S.FeatureItem>
            <S.FeatureItem>
              <S.FeatureIcon><FaCheckCircle /></S.FeatureIcon>
              Controle de veículos e serviços
            </S.FeatureItem>
            <S.FeatureItem>
              <S.FeatureIcon><FaCheckCircle /></S.FeatureIcon>
              Filtros avançados de busca
            </S.FeatureItem>
            <S.FeatureItem>
              <S.FeatureIcon><FaCheckCircle /></S.FeatureIcon>
              Controle financeiro integrado
            </S.FeatureItem>
          </S.FeaturesList>

          <S.VersionInfo>
            <p>Versão da API: 0.1.0 | Versão do software: 0.1.5-1</p>
          </S.VersionInfo>
        </S.LeftSide>

        <S.RightSide>
          <S.LoginTitle>Acessar Sistema</S.LoginTitle>
          <S.LoginSubtitle>Entre com suas credenciais para acessar o sistema</S.LoginSubtitle>

          <S.Form onSubmit={handleSubmit}>
            {errors.general && (
              <S.GeneralError>
                {errors.general}
              </S.GeneralError>
            )}

            <S.FormGroup>
              <S.FormLabel htmlFor="username">Usuário</S.FormLabel>
              <S.InputWithIcon>
                <S.InputIcon>
                  <FaUser />
                </S.InputIcon>
                <S.StyledInput
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Digite seu usuário"
                  value={formData.username}
                  onChange={handleInputChange}
                  $hasError={!!errors.username}
                  disabled={isLoading}
                />
              </S.InputWithIcon>

              <S.InputError>{errors.username}</S.InputError>
            </S.FormGroup>

            <S.FormGroup>
              <S.FormLabel htmlFor="password">Senha</S.FormLabel>
              <S.InputWithIcon>
                <S.InputIcon>
                  <FaLock />
                </S.InputIcon>
                <S.StyledInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  $hasError={!!errors.password}
                  disabled={isLoading}
                />
              </S.InputWithIcon>
              <S.InputError>{errors.password}</S.InputError>
            </S.FormGroup>

            <S.RememberForgot>
              <S.Remember>
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <label htmlFor="remember">Lembrar-me</label>
              </S.Remember>
              <S.ForgotPassword onClick={handleForgotPassword}>
                Esqueceu a senha?
              </S.ForgotPassword>
            </S.RememberForgot>

            <S.LoginButton type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
            </S.LoginButton>
          </S.Form>

          <S.Divider>
            <span>Ou acesse com</span>
          </S.Divider>

          <S.SocialLogin>
            <S.SocialIcon
              platform="facebook"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebookF />
            </S.SocialIcon>
            <S.SocialIcon
              platform="google"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle />
            </S.SocialIcon>
            <S.SocialIcon
              platform="linkedin"
              onClick={() => handleSocialLogin('LinkedIn')}
            >
              <FaLinkedinIn />
            </S.SocialIcon>
          </S.SocialLogin>

          <S.SignupLink>
            Não tem uma conta?{' '}
            <S.SignupLinkAnchor onClick={handleSignupRequest}>
              Solicitar acesso
            </S.SignupLinkAnchor>
          </S.SignupLink>
        </S.RightSide>
      </S.LoginContainer>
    </S.Container>
  );
};
