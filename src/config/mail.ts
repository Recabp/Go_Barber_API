interface IMailConfig {
  driver: 'ethereal' | 'ses',

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'renatoto@gobarber.com.br',
      name: 'Renato da Gobarber'
    }
  }
} as IMailConfig;
