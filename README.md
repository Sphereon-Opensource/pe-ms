<h1 align="center">
  <br>
  <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="400"></a>
    <br>PEX MS  
    <br>DIF Presentation Exchange REST API 
  <br>
</h1>

## Active Development

_IMPORTANT: This software still is in early development stage. As such you should expect breaking changes in APIs, we
expect to keep that to a minimum though._

## Terminology

- **Decentralized Identifier (DID)** as defined in [DID-CORE](https://gataca-io.github.io/verifier-apis/#bib-did-core)
- **DID document** as defined in [DID-CORE](https://gataca-io.github.io/verifier-apis/#bib-did-core)
- **DID resolution** as defined in [DID-RESOLUTION](https://gataca-io.github.io/verifier-apis/#bib-did-resolution)
- **Revocation List 2020** as defined in [REVOCATION-LIST-2020](https://w3c-ccg.github.io/vc-status-rl-2020/)
- **Verifier** as defined in [VC-DATA-MODEL](https://gataca-io.github.io/verifier-apis/#bib-vc-data-model)
- **Verifiable Credential (VC)** as defined
  in [VC-DATA-MODEL](https://gataca-io.github.io/verifier-apis/#bib-vc-data-model)
- **Verifiable Presentation (VP)** as defined
  in [VC-DATA-MODEL](https://gataca-io.github.io/verifier-apis/#bib-vc-data-model)

## Background

This is a stateful REST API implemented using MongoDB, TypeORM, TypeScript and NodeJS. The motivation is to build
scalable interoperability solutions between wallet- and verifier- technology providers. That is, to make any wallet
adhering to the protocol be able to successfully exchange credentials with any verifier adhering to the protocol. It
uses @Sphereon/pex which is an implementation of
the [DIF Presentation Exchange](https://identity.foundation/presentation-exchange/)
specification and @Sphereon/pex-models which provides the classes and interfaces to handle the presentation exchange
entities.

## Sequence diagram:

![Sequence diagram](https://raw.githubusercontent.com/Sphereon-Opensource/essifi-deliverables/master/interface_specifications/figures/PE_REST_API_sequence.svg?sanitize=true)

### API reference

#### Create thread

endpoint: POST /pe/v1/thread
</br>HTTP status response: 201
</br>response body:

```json
{
  "id": "61e01222a047c5a54c7c85bb",
  "challenge": {
    "token": "c44c5fcb1437c2fb9f4803f491c5a28b",
    "holder": null
  }
}
```

#### Create presentation definition

endpoint: POST /pe/v1/definitions
</br> request body:

```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "id": "32f54163-7166-48f1-93d8-ff217bdb0653",
  "comment": "Create PD test",
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
  "callback": {
    "url": "http://localhost:3000/pe/v1/definitions/32f54163-7166-48f1-93d8-ff217bdb0653/status"
  },
  "challenge": {
    "token": "d6bb6a29ee15f0c063bce2157a4633cb",
    "holder": null
  }
}
```

</br>HTTP status response: 201
</br>response body:

```json
{
  "thread": {
    "id": "61efc63d79d81a2734080dda"
  },
  "challenge": {
    "token": "c44c5fcb1437c2fb9f4803f491c5a28b",
    "holder": null
  },
  "definition_url": "http://localhost:3000/pe/v1/definitions/32f54163-7166-48f1-93d8-ff217bdb0653"
}
```

#### Retrieve presentation definition

GET /pe/v1/definitions/:id?thread_id=:thread_id&token=:token
</br>HTTP status response: 200
</br>response body:

```json
{
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
  "challenge": {
    "token": "c44c5fcb1437c2fb9f4803f491c5a28b",
    "holder": null
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
    "token": "c44c5fcb1437c2fb9f4803f491c5a211",
    "holder": null
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
    "token": "c44c5fcb1437c2fb9f4803f491c5a28b"
  }
}
```

#### Retrieve presentation definition status

GET /pe/v1/definitions/:id/statuses?thread_id=:thread_id&token=:token
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
    "token": "c44c5fcb1437c2fb9f4803f491c5a211",
    "holder": null
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
    "token": "c44c5fcb1437c2fb9f4803f491c5a211",
    "holder": null
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
    "id": "61efc63d79d81a2734080dda"
  },
  "challenge": {
    "token": "58e073625483baae5db31bd798f25806",
    "holder": null
  },
  "presentation_id": "43d975f8-3cc6-47b0-88f8-7bdf57e05191",
  "result": {
    "verifiableCredential": [
      {
        "iss": "did:example:123",
        "vc": {
          "@context": "https://bank-schemas.org/2.0.0/accounts.json",
          "id": "https://bank-schemas.org/2.0.0/accounts.json",
          "type": [
            "EUDriversLicense"
          ],
          "issuer": "did:example:123",
          "issuanceDate": "2010-01-01T19:73:24Z",
          "credentialSubject": {
            "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
            "accounts": [
              {
                "id": "1234567890",
                "route": "DE-9876543210"
              },
              {
                "id": "2457913570",
                "route": "DE-0753197542"
              }
            ]
          }
        },
        "proof": {
          "type": "EcdsaSecp256k1VerificationKey2019",
          "created": "2017-06-18T21:19:10Z",
          "proofPurpose": "assertionMethod",
          "verificationMethod": "https://example.edu/issuers/keys/1",
          "jws": "..."
        }
      }
    ],
    "warnings": [],
    "errors": [],
    "value": {
      "id": "r5CGL2oLOYz-DB_GIjzn3",
      "definition_id": "5c283343-3a37-40a0-9b56-836f54df4b86",
      "descriptor_map": [
        {
          "id": "banking_input_1",
          "format": "ldp_vc",
          "path": "$.verifiableCredential[0]"
        }
      ]
    }
  }
}
```

#### Retrieve presentation

GET /pe/v1/presentations/:id?thread_id=:thread_id&token=:token
</br>HTTP status response: 200
</br>response body:

```json
{
  "thread": {
    "id": "61efc63d79d81a2734080dda"
  },
  "id": "43d975f8-3cc6-47b0-88f8-7bdf57e05191",
  "comment": "Create PD test",
  "presentation": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://identity.foundation/presentation-exchange/submission/v1"
    ],
    "type": [
      "VerifiablePresentation",
      "PresentationSubmission"
    ],
    "presentation_submission": {
      "id": "40386a26-0a40-4be3-926f-a2ce95ba9d39",
      "definition_id": "5c283343-3a37-40a0-9b56-836f54df4b86",
      "descriptor_map": [
        {
          "id": "banking_input_2",
          "format": "jwt_vc",
          "path": "$.verifiableCredential[0]"
        }
      ]
    },
    "verifiableCredential": [
      {
        "iss": "did:example:123",
        "vc": {
          "@context": "https://bank-schemas.org/2.0.0/accounts.json",
          "id": "https://bank-schemas.org/2.0.0/accounts.json",
          "type": [
            "EUDriversLicense"
          ],
          "issuer": "did:example:123",
          "issuanceDate": "2010-01-01T19:73:24Z",
          "credentialSubject": {
            "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
            "accounts": [
              {
                "id": "1234567890",
                "route": "DE-9876543210"
              },
              {
                "id": "2457913570",
                "route": "DE-0753197542"
              }
            ]
          }
        },
        "proof": {
          "type": "EcdsaSecp256k1VerificationKey2019",
          "created": "2017-06-18T21:19:10Z",
          "proofPurpose": "assertionMethod",
          "verificationMethod": "https://example.edu/issuers/keys/1",
          "jws": "..."
        }
      }
    ],
    "proof": {
      "type": "RsaSignature2018",
      "created": "2018-09-14T21:19:10Z",
      "proofPurpose": "authentication",
      "verificationMethod": "did:example:ebfeb1f712ebc6f1c276e12ec21#keys-1",
      "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
      "domain": "4jt78h47fh47",
      "jws": "..."
    }
  },
  "challenge": {
    "token": "4ce4ab23cb3f091f000f98953ae50457",
    "holder": null
  },
  "pdId": "5c283343-3a37-40a0-9b56-836f54df4b86",
  "callback": {
    "url": "http://localhost:3000/presentations/43d975f8-3cc6-47b0-88f8-7bdf57e05191/statuses"
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
    "token": "4ce4ab23cb3f091f000f98953ae50457",
    "holder": null
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
    "token": "4ce4ab23cb3f091f000f98953ae50481",
    "holder": null
  }
}
```

#### Retrieve presentation status

GET /pe/v1/presentations/:id/status?thread_id=:thread_id&token=:token
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
    "token": "4ce4ab23cb3f091f000f98953ae50510",
    "holder": null
  }
}
```

#### Missing required properties

HTTP status response: 400

```json
{
  "errors": [],
  "message": "Validation error",
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "challenge": {
    "token": "4ce4ab23cb3f091f000f98953ae50510",
    "holder": null
  }
}
```

#### Resource not found

HTTP status response: 404

```json
{
  "thread": {
    "id": "61e01222a047c5a54c7c85bb"
  },
  "challenge": {
    "token": "4ce4ab23cb3f091f000f98953ae50510",
    "holder": null
  }
}
```

#### Internal server error

HTTP status response: 500

```json
{
  "message": "Some error message"
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
2. change MONGODB_URL environment variable to point to the ip of the server where MongoDB is running

```shell
yarn install
```

#### Run

```shell
yarn start
```

#### Test

Test are ran using Postman:

_IMPORTANT: Make sure the application is running_

1. Import the Postman collection from <root_folder>/test/DIF_PE_API.postman_collection.json;
2. Import the environment variables from <root_folder>/test/dev.postman_environment.json;
3. Make sure the dev environment is selected on the right top side of the screen;
4. Select Collections from the menu on the left side of the screen;
5. Click on the ... on the right side of DIF PE API;
6. A dropdown will be shown, from which you need to select Run collection;
7. In the run collection screen, select the data from <root_folder>/test/testing_data.json
8. Click on run DIF PE API.

### Run with Docker-Compose

You can simply start the service with running `yarn docker:start` at the root of project, or of you like to use the
docker tools directly `docker-compose up --build -d`. It will pull in a mongo image for the persistence.
