import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotosProvider } from '../../providers/fotos/fotos';
import { IncluiFotoPage } from '../inclui-foto/inclui-foto';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


/**
 * Generated class for the VisualizarFotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-fotos',
  templateUrl: 'visualizar-fotos.html',
})
export class VisualizarFotosPage {

  local: any = {};
  fotosmostrar = [];
  fotoForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fotosProvider:FotosProvider, public formBuilder: FormBuilder) {

      this.fotoForm = formBuilder.group({
        comentario: ['', Validators.required],
      });
      // recupera os dados da view anterior
    this.local = this.navParams.data;
    /* aqui fazemos a query para mostrar somente as fotos do local
    podemos usar esse metodo para qualquer tipo de filtro, passando o campo que quer buscar
    e o valor do campo no segundo atributo.
    como usaremos o recurso real time database do firebase, ele retorna um observable, usando
    subscribe inserimos os dados na nossa lista e alterando no banco de dados automaticamente
    irá mudar a lista de todos os usuarios online
    */
    this.fotosProvider.getByQuery('idlocal', this.local.payload.key).subscribe(resp => this.fotosmostrar = resp);


  }

  salvarComentario(foto){

    let f=foto.payload.val();
    if(!f.comentarios){
      f.comentarios = [this.fotoForm.value.comentario]
    }else{
      f.comentarios.push(this.fotoForm.value.comentario)
    }
    console.log(f)
    this.fotosProvider.update(foto.payload.key, f)
  }
  incluirFoto(){
    // passamos o parametro do local para o proxima view e abrimos a pagina de incluir fotos
    this.navParams.data = this.local;
    this.navCtrl.push(IncluiFotoPage, this.navParams);
  }

  voltarPagina(){
    this.navCtrl.pop();
  }

}
