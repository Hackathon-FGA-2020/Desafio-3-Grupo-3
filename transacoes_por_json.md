**/product** : operacoes nos produtos
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
criar novo produto| POST | request_models/product/product_new.json
modificar produto| PATCH | request_models/product/product_modify.json
resgatar produto especifico| GET | `{ "_id" : "_id_do_produto" }`
excluir produto| DELETE | `{ "_id" : "_id_do_produto_a_excluir" }`

**/product/all** : resgatar todos os produtos
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar todos os produtos| GET | (nao precisa ter body)

**/productoffer** : oferta de produtos feitas pelos produtores
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
criar nova oferta de produto| POST | request_models/productoffer/productoffer_new.json
modificar oferta de produto| PATCH | request_models/productoffer/productoffer_modify.json
excluir oferta de produto| DELETE | `{ "_id" : "_id_da_oferta_a_excluir" }`
resgatar oferta de produto especifica| GET | `{ "_id" : "_id_da_oferta_a_retornar" }`

**/productoffer/all** : resgatar todos os produtos
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar todas as ofertas| GET | (nao precisa ter body)

**/productoffer/producer** : resgatar oferta de produto a partir de produtor
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar oferta de um dado produtor| GET | `{ "_id" : "_id_da_oferta_a_retornar" }`


**/user** : usuarios, tanto consum_idores quanto produtores
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
criar novo usuario| POST | request_models/user_new.json
resgatar usuario| GET | `{ "_id" : "_id_do_usuario_a_resgatar" }`

**/producer** : resgatar produtor
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar produtor | GET | `{ "_id" : "_id_do_produtor_resgatar" }`

**/producer/all** : visualizar todos produtos
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar todos os produtores| GET | (nao precisa de body)

**/order** : ped_idos feito pelos usuarios
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
criar novo pedido| POST | request_models/order/order_new.json
modificar pedido| PATCH | request_models/order/order_modify.json
excluir pedido| DELETE | `{ "_id" : "_id_do_ped_ido_a_excluir" }`
resgatar um pedido especifico| GET | `{ "_id" : "_id_do_ped_ido_a_resgatar" }`

**/order/producer** : ped_idos associados aos produtores 
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar todos os pedidos associados a um produtor| GET | `{ "_id" : "_id_do_produtor" }`

**/order/user** : pedidos associados aos produtores 
Descrição | METODO HTTP | modelo da requisição JSON
--------- | ----------- | -------------------------
resgatar todos os pedidos associados a um usuario| GET | `{ "_id" : "_id_do_usuario" }`