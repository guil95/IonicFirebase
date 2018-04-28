import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CadastrarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage {

  usuarioForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private AuthProvider:AuthProvider) {
  /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
      */
      this.usuarioForm = formBuilder.group({
        usuario: ['', Validators.required],
        senha: ['', Validators.required],
      });
  }
  //caso o formulario seja valido salva o local e volta pra pagina inicial
  salvarUsuario(){
    if (!this.usuarioForm.valid) {
      return alert('preencha todos os campos');
      
    } else {
      if(this.usuarioForm.value.senha.length < 6){
        return alert("Senha deve ter mais de 6 digitos")
        
      }
      this.AuthProvider.signupUser(this.usuarioForm.value.usuario,this.usuarioForm.value.senha);
      alert('salvo');
      this.voltarPagina();
    }
  }

  voltarPagina(){
    this.navCtrl.setRoot(LoginPage);
  }

}
