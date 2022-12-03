import { io } from '../index'
import { uuid } from 'uuidv4';

export default {
  ioMessage(args, res) {
    res.setHeader('Content-Type', 'application/json');
    io.emit(args.channel.value, { type: 'mensaje', payload: args.message.value })
    res.end(JSON.stringify({ status: 'Mensaje enviado a Socket-IO' }));
  },

  postSocket(args, res) {
    res.setHeader('Content-Type', 'application/json');

    let mi_mensaje = {
      "event_id": `${uuid()}`,
      "device_serial": `${args.body.value.serial}`,
      "display_template_id": "PG2",
      "display_fields": [{
        "display_field_id": 1,
        "display_field_header": "Storage Unit",
        "display_field_text": "R15"
      },
      {
        "display_field_id": 2,
        "display_field_header": "Destination",
        "display_field_text": "A7"
      }
      ]
    }

    io.emit(process.env.CHANNEL, mi_mensaje)
    res.end(JSON.stringify(mi_mensaje));
  },


}