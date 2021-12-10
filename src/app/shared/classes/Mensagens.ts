import Swal from 'sweetalert2';

export class Mensagens {
  static sucesso(mensagem: string, toast = true) {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: mensagem,
      timer: 2000,
      timerProgressBar: true,
      toast,
      showConfirmButton: false,
      position: 'top-right',
    });
  }

  static formatarMensagens(mensagens: any[]): string {
    let saida = '<ul>';
    for (let i = 0; i < mensagens.length; i++) {
      saida += `<div><i class="fas fa-exclamation-circle"></i> ${mensagens[i]}</div>`;
    }
    return saida + '</ul>';
  }

  static erro(mensagens: any[] | string, toast = true, timer = 0) {
    Swal.fire({
      icon: 'error',
      iconHtml: '',
      position: 'top-end',
      timerProgressBar: true,
      timer,
      toast,
      title: 'Ocorreu um erro',
      html: Array.isArray(mensagens)
        ? this.formatarMensagens(mensagens)
        : `<div>${
            mensagens || 'Erro não mapeado, entre em contato com o suporte'
          }</div>`,
      showConfirmButton: timer ? false : true,
    });
  }
}
