<h1 align="center">
  <br>
  <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="400"></a>
    <br>PEX MS  
    <br>DIF Presentation Exchange REST API 
  <br>
</h1>

## Active Development
_IMPORTANT: This software still is in early development stage. As such you should expect breaking changes in APIs, we expect to keep that to a minimum though._

## Terminology

- **Decentralized Identifier (DID)** as defined in [DID-CORE](https://gataca-io.github.io/verifier-apis/#bib-did-core)
- **DID document** as defined in [DID-CORE](https://gataca-io.github.io/verifier-apis/#bib-did-core)
- **DID resolution** as defined in [DID-RESOLUTION](https://gataca-io.github.io/verifier-apis/#bib-did-resolution)
- **Revocation List 2020** as defined in [REVOCATION-LIST-2020](https://w3c-ccg.github.io/vc-status-rl-2020/)
- **Verifier** as defined in [VC-DATA-MODEL](https://gataca-io.github.io/verifier-apis/#bib-vc-data-model)
- **Verifiable Credential (VC)** as defined in [VC-DATA-MODEL](https://gataca-io.github.io/verifier-apis/#bib-vc-data-model)
- **Verifiable Presentation (VP)** as defined in [VC-DATA-MODEL](https://gataca-io.github.io/verifier-apis/#bib-vc-data-model)

## Background

This is a stateful REST API implemented using MongoDB, TypeORM, TypeScript and NodeJS. The motivation is to build scalable
interoperability solutions between wallet- and verifier- technology providers. That is, to make any wallet adhering to the protocol be able to successfully exchange credentials with
any verifier adhering to the protocol. It uses @Sphereon/pex which is an implementation of the [DIF Presentation Exchange](https://identity.foundation/presentation-exchange/)
specification and @Sphereon/pex-models which provides the classes and interfaces to handle the presentation exchange entities.

## Sequence diagram:

![Sequence diagram](https://raw.githubusercontent.com/Sphereon-Opensource/essifi-deliverables/master/interface_specifications/figures/PE_REST_API_sequence.svg?sanitize=true)

### API reference

#### Create thread
endpoint: POST /pe/v1/thread
</br>HTTP status response: 201
</br>response body: 
```json
{ "id": "61e01222a047c5a54c7c85bb" }
```
#### Create presentation definition
endpoint: POST /pe/v1/definitions
</br> request body: 
```json
{
   "thread":{
      "id":"61e01222a047c5a54c7c85bb"
   },
   "id":"32f54163-7166-48f1-93d8-ff217bdb0653",
   "comment":"Create PD test",
   "presentation_definition":{
      "id":"32f54163-7166-48f1-93d8-ff217bdb0653",
      "name":"Conference Entry Requirements",
      "purpose":"We can only allow people associated with Washington State business representatives into conference areas",
      "format":{
         "jwt":{
            "alg":[
               "ES384"
            ]
         },
         "jwt_vc":{
            "alg":[
               "ES384"
            ]
         },
         "jwt_vp":{
            "alg":[
               "ES384"
            ]
         },
         "ldp_vc":{
            "proof_type":[
               "JsonWebSignature2020",
               "Ed25519Signature2018",
               "EcdsaSecp256k1Signature2019",
               "RsaSignature2018"
            ]
         },
         "ldp_vp":{
            "proof_type":[
               "Ed25519Signature2018"
            ]
         },
         "ldp":{
            "proof_type":[
               "RsaSignature2018"
            ]
         }
      },
      "input_descriptors":[
         {
            "id":"wa_driver_license",
            "name":"Washington State Business License",
            "purpose":"We can only allow licensed Washington State business representatives into the WA Business Conference",
            "constraints":{
               "limit_disclosure":"required",
               "fields":[
                  {
                     "path":[
                        "$.issuer",
                        "$.vc.issuer",
                        "$.iss"
                     ],
                     "purpose":"We can only verify bank accounts if they are attested by a trusted bank, auditor, or regulatory authority.",
                     "filter":{
                        "type":"string",
                        "pattern":"did:example:123|did:example:456"
                     }
                  }
               ]
            }
         }
      ],
      "frame":{
         "@context":{
            "@vocab":"http://example.org/",
            "within":{
               "@reverse":"contains"
            }
         },
         "@type":"Chapter",
         "within":{
            "@type":"Book",
            "within":{
               "@type":"Library"
            }
         }
      }
   },
   "callback":{
      "url":"http://localhost:3000/pe/v1/definitions/32f54163-7166-48f1-93d8-ff217bdb0653/status"
   }
}
```
</br>HTTP status response: 201
</br>response body: 
```json
{
    "definition_url":"http://localhost:3000/pe/v1/definitions/32f54163-7166-48f1-93d8-ff217bdb0653"
}
```
#### Retrieve presentation definition
GET /pe/v1/definitions/:id
</br>HTTP status response: 200
</br>response body:
```json
{
    "_id": "61dfee2c1697578fbfb97707",
    "presentation_definition": {
        "id": "32f54163-7166-48f1-93d8-ff217bdb0653",
        "name": "Conference Entry Requirements",
        "purpose": "We can only allow people associated with Washington State business representatives into conference areas",
        "format": {
            "jwt": {
                "alg": [
                    "ES384"
                ]
            },
            "jwt_vc": {
                "alg": [
                    "ES384"
                ]
            },
            "jwt_vp": {
                "alg": [
                    "ES384"
                ]
            },
            "ldp_vc": {
                "proof_type": [
                    "JsonWebSignature2020",
                    "Ed25519Signature2018",
                    "EcdsaSecp256k1Signature2019",
                    "RsaSignature2018"
                ]
            },
            "ldp_vp": {
                "proof_type": [
                    "Ed25519Signature2018"
                ]
            },
            "ldp": {
                "proof_type": [
                    "RsaSignature2018"
                ]
            }
        },
        "input_descriptors": [
            {
                "id": "wa_driver_license",
                "name": "Washington State Business License",
                "purpose": "We can only allow licensed Washington State business representatives into the WA Business Conference",
                "constraints": {
                    "limit_disclosure": "required",
                    "fields": [
                        {
                            "path": [
                                "$.issuer",
                                "$.vc.issuer",
                                "$.iss"
                            ],
                            "purpose": "We can only verify bank accounts if they are attested by a trusted bank, auditor, or regulatory authority.",
                            "filter": {
                                "type": "string",
                                "pattern": "did:example:123|did:example:456"
                            }
                        }
                    ]
                }
            }
        ],
        "frame": {
            "@context": {
                "@vocab": "http://example.org/",
                "within": {
                    "@reverse": "contains"
                }
            },
            "@type": "Chapter",
            "within": {
                "@type": "Book",
                "within": {
                    "@type": "Library"
                }
            }
        }
    },
    "id": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "comment": "Create PD test",
    "thread": {
        "id": "61e01222a047c5a54c7c85bb"
    },
    "callback": {
        "url": "http://localhost:3000/pe/v1/definitions/32f54163-7166-48f1-93d8-ff217bdb0653/status"
    }
}
```
#### Update presentation definition status
POST /pe/v1/definitions/:id/statuses
</br>request body:
```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "definition_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "status": "DELETED",
  "message": "The presentation definition has been deleted",
  "challenge": {
    "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
  }
}
```
</br>HTTP status response: 200
</br>response body:
```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "definition_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "status": "DELETED",
  "message": "The presentation definition has been deleted",
  "challenge": {
    "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
  }
}
```
#### Retrieve presentation definition status
GET /pe/v1/definitions/:id/statuses
</br>HTTP status response: 200
</br>response body:
```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "definition_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "status": "DELETED",
  "message": "The presentation definition has been deleted",
  "challenge": {
    "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
  }
}
```
#### Create presentation
POST /pe/v1/presentations
</br>request body:
```json
{
    "thread": {
        "id": "61e01222a047c5a54c7c85bb"
    },
    "id": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "comment": "Create PD test",
    "presentation": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://identity.foundation/presentation-exchange/submission/v1"
        ],
        "presentation_submission": {
            "id": "accd5adf-1dbf-4ed9-9ba2-d687476126cb",
            "definition_id": "31e2f0f1-6b70-411d-b239-56aed5321884",
            "descriptor_map": [
                {
                    "id": "867bfe7a-5b91-46b2-9ba4-70028b8d9cc8",
                    "format": "ldp_vp",
                    "path": "$.verifiableCredential[0]"
                }
            ]
        },
        "type": [
            "VerifiablePresentation",
            "PresentationSubmission"
        ],
        "verifiableCredential": [
            {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1"
                ],
                "credentialSchema": [
                    {
                        "id": "https://www.w3.org/TR/vc-data-model/#types"
                    }
                ],
                "credentialSubject": {
                    "age": 19,
                    "etc": "etc"
                },
                "id": "2dc74354-e965-4883-be5e-bfec48bf60c7",
                "issuer": "",
                "type": "VerifiableCredential",
                "proof": {
                    "type": "BbsBlsSignatureProof2020",
                    "created": "2020-04-25",
                    "verificationMethod": "did:example:489398593#test",
                    "proofPurpose": "assertionMethod",
                    "proofValue": "kTTbA3pmDa6Qia/JkOnIXDLmoBz3vsi7L5t3DWySI/VLmBqleJ/Tbus5RoyiDERDBEh5rnACXlnOqJ/U8yFQFtcp/mBCc2FtKNPHae9jKIv1dm9K9QK1F3GI1AwyGoUfjLWrkGDObO1ouNAhpEd0+et+qiOf2j8p3MTTtRRx4Hgjcl0jXCq7C7R5/nLpgimHAAAAdAx4ouhMk7v9dXijCIMaG0deicn6fLoq3GcNHuH5X1j22LU/hDu7vvPnk/6JLkZ1xQAAAAIPd1tu598L/K3NSy0zOy6obaojEnaqc1R5Ih/6ZZgfEln2a6tuUp4wePExI1DGHqwj3j2lKg31a/6bSs7SMecHBQdgIYHnBmCYGNQnu/LZ9TFV56tBXY6YOWZgFzgLDrApnrFpixEACM9rwrJ5ORtxAAAAAgE4gUIIC9aHyJNa5TBklMOh6lvQkMVLXa/vEl+3NCLXblxjgpM7UEMqBkE9/QcoD3Tgmy+z0hN+4eky1RnJsEg=",
                    "nonce": "6i3dTz5yFfWJ8zgsamuyZa4yAHPm75tUOOXddR6krCvCYk77sbCOuEVcdBCDd/l6tIY="
                }
            }
        ]
    },
    "challenge": {
        "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
    },
    "pdId": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "callback": {
        "url": "http://localhost:3000/presentations/32f54163-7166-48f1-93d8-ff217bdb0653/statuses"
    }
}
```
</br>HTTP status response: 201
</br>response body:
```json
{
    "thread": {
        "id": "61e01222a047c5a54c7c85bb"
    },
    "presentation_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "warnings": []
}
```
#### Retrieve presentation
GET /pe/v1/presentations/:id
</br>HTTP status response: 200
</br>response body:
```json
{
    "_id": "61dfee811697578fbfb97709",
    "pdId": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "challenge": {
        "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
    },
    "presentation": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://identity.foundation/presentation-exchange/submission/v1"
        ],
        "presentation_submission": {
            "id": "accd5adf-1dbf-4ed9-9ba2-d687476126cb",
            "definition_id": "31e2f0f1-6b70-411d-b239-56aed5321884",
            "descriptor_map": [
                {
                    "id": "867bfe7a-5b91-46b2-9ba4-70028b8d9cc8",
                    "format": "ldp_vp",
                    "path": "$.verifiableCredential[0]"
                }
            ]
        },
        "type": [
            "VerifiablePresentation",
            "PresentationSubmission"
        ],
        "verifiableCredential": [
            {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1"
                ],
                "credentialSchema": [
                    {
                        "id": "https://www.w3.org/TR/vc-data-model/#types"
                    }
                ],
                "credentialSubject": {
                    "age": 19,
                    "etc": "etc"
                },
                "id": "2dc74354-e965-4883-be5e-bfec48bf60c7",
                "issuer": "",
                "type": "VerifiableCredential",
                "proof": {
                    "type": "BbsBlsSignatureProof2020",
                    "created": "2020-04-25",
                    "verificationMethod": "did:example:489398593#test",
                    "proofPurpose": "assertionMethod",
                    "proofValue": "kTTbA3pmDa6Qia/JkOnIXDLmoBz3vsi7L5t3DWySI/VLmBqleJ/Tbus5RoyiDERDBEh5rnACXlnOqJ/U8yFQFtcp/mBCc2FtKNPHae9jKIv1dm9K9QK1F3GI1AwyGoUfjLWrkGDObO1ouNAhpEd0+et+qiOf2j8p3MTTtRRx4Hgjcl0jXCq7C7R5/nLpgimHAAAAdAx4ouhMk7v9dXijCIMaG0deicn6fLoq3GcNHuH5X1j22LU/hDu7vvPnk/6JLkZ1xQAAAAIPd1tu598L/K3NSy0zOy6obaojEnaqc1R5Ih/6ZZgfEln2a6tuUp4wePExI1DGHqwj3j2lKg31a/6bSs7SMecHBQdgIYHnBmCYGNQnu/LZ9TFV56tBXY6YOWZgFzgLDrApnrFpixEACM9rwrJ5ORtxAAAAAgE4gUIIC9aHyJNa5TBklMOh6lvQkMVLXa/vEl+3NCLXblxjgpM7UEMqBkE9/QcoD3Tgmy+z0hN+4eky1RnJsEg=",
                    "nonce": "6i3dTz5yFfWJ8zgsamuyZa4yAHPm75tUOOXddR6krCvCYk77sbCOuEVcdBCDd/l6tIY="
                }
            }
        ]
    },
    "thread": {
        "id": "61e01222a047c5a54c7c85bb"
    },
    "id": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "comment": "Create PD test",
    "callback": {
        "url": "http://localhost:3000/presentations/32f54163-7166-48f1-93d8-ff217bdb0653/statuses"
    }
}
```
#### Update presentation status
POST /pe/v1/presentations/:id/status
</br>request body:
```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "presentation_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "status": "ACCEPTED",
  "message": "The presentation has been accepted without reservation",
  "challenge": {
    "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
  }
}
```
</br>HTTP status response: 200
</br>response body:
```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "presentation_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "status": "ACCEPTED",
  "message": "The presentation has been accepted without reservation",
  "challenge": {
    "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
  }
}
```
#### Retrieve presentation status
GET /pe/v1/presentations/:id/status
</br>HTTP status response: 200
</br>response body:
```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "presentation_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "status": "ACCEPTED",
  "message": "The presentation has been accepted without reservation",
  "challenge": {
    "token": "33a5b0d0f917e2a557f78a6a19f4ba6f393c09a1e55df6a0b968e3b8f86c96ee667e46a48d08fac37c4f7c812021491d6044b6f18e6e573de06cd9474c67ccfc"
  }
}
```
#### Missing required properties
HTTP status response: 400
```json
{
    "status": "ERROR",
    "issues": [
        {
            "code": "400",
            "tag": "BAD REQUEST",
            "status": "ERROR",
            "message": "[{\"property\":\"id\",\"constraints\":{\"isNotEmpty\":\"PresentationDefinitionWrapper.id is invalid\"}}]"
        }
    ]
}
```
#### Resource not found
HTTP status response: 404
```json
{
    "status": "ERROR",
    "issues": [
        {
            "code": "404",
            "tag": "NOT FOUND",
            "status": "ERROR",
            "message": "Resource not found"
        }
    ]
}
```
#### Internal server error
HTTP status response: 500
```json
{
  "status": "ERROR",
  "issues": [
    {
      "code": "500",
      "tag": "INTERNAL SERVER ERROR",
      "status": "ERROR",
      "message": "Unexpected error occurred"
    }
  ]
}
```

## For PEX-MS developers

This project has been created using:
* `yarn` version 1.22.11
* `node` version 14.17.5
* `docker-compose` version 1.26.2

### Running
1. Without docker:
</br></br>_IMPORTANT: You need to have an instance of MongoDB installed and running_
</br></br>For running without docker, you can use the following steps:
#### Install
```shell
yarn install
```
#### Build
```shell
yarn build
```
#### Run
```shell
yarn start
```

#### Test
Test are ran manually using Postman:

1. Import the collection from <root_folder>/test/postman_collections

### Run with Docker-Compose

You can simply start the service with running `yarn docker:start` at the root of project, or of you like to use the docker tools directly `docker-compose up --build -d`. It will pull in a mongo image for the persistence.
