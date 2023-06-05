# Field Agent Plan

## Security Clearance

... TODO

## Alias

### Domain Rules

* Name is required.
* Persona is not required unless a name is duplicated. The persona differentiates between duplicate names.

#### Examples

`name` = "Nutmeg", `persona` = null
`name` = "Nutmeg", `persona` = "Mysterious, like eggnog"
~~`name` = "Nutmeg", `persona` = "Mysterious, like eggnog"~~

### Model

* [x] `Alias`
  * private int aliasId
  * private String name
  * private String persona
  * private int agentId

### Fetch an individual agent with aliases attached

* [x] Add list of `Alias` to `Agent`
* [x] Add `AliasMapper`
* [x] Add method to add aliases in `AgentJdbcTemplateRepository.findById()`

### Add an alias

* [x] Add `AliasRepository`
  * [x] Add `add` method `Alias add()`
* [x] Add `AliasService`
  * [x] Add `add` method: `Result<Alias> add()`
  * [x] Add validations
* [x] Add `AliasController`
  * [x] `ResponseEntity<Object> add()`
    * 201 if success
    * 400 if invalid

### Update an alias

* [x] Repository `boolean update()`
* [x] Service `Result<Alias> update()`
* [x] Controller `ResponseEntity<Object> update()`
  * 404 if not found
  * 400 if invalid
  * 204 if success
  * 409 for id mismatch

### Delete an alias

* [x] Repository `boolean deleteById()`
* [x] Service `boolean deleteById()`
* [x] Controller `ResponseEntity<Object> deleteById()`
  * 404 if not found
  * 204 if success

## Global Exception Handling

... TODO
