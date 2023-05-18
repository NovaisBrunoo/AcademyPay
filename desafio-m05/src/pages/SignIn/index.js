import FormEmailSenha from '../../components/Form/FormEmailSenha';

import './styles.css';

function SingIn() {
  return (

    <div className="loginCorpo">
      <div className="loginEsquerda">
        <div className="loginTexto">
          <h2>
            Gerencie todos os pagamentos <br />
            da sua empresa em um só <br />
            lugar.
          </h2>
        </div>
      </div>
      <div className="loginDireita">
        <FormEmailSenha />
      </div>
    </div>
  );
}

export default SingIn;
