Endpoints :

List of available endpoints:

POST /register
POST /login
GET /users
POST /sign-in
PATCH /subscription
POST /generate-midtrans-token
GET /campuses
GET /campuses/:id
GET /exams/:id
GET /campuses/invitees/:id
GET /favourites
POST /favourites/:examId
DELETE /favourites/:id
POST /tests/:InviteeId

1. POST /register

Request:

body:
{
"name": "string",
"email": "string",
"password": "string",
"school": "string",
"studentClass": "integer"
"isSubscribed": "string"
}
Response (201 - Created)

{
"id": "integer",
"name": "string",
"email": "string",
"password": "string",
"school": "string",
"studentClass": "integer"
"isSubscribed": "string"
}
Response (400 - Bad Request)

{
"message": "name cannot be null"
}
OR
{
"message": "name cannot be Empty"
}
OR
{
"message": "email used"
}
OR
{
"message": "not email format"
}
OR
{
"message": "email cannot be null"
}
OR
{
"message": "just for gmail"
}
OR
{
"message": "email cannot be Empty"
}
OR
{
"message": "password cannot be null"
}
OR
{
"message": "password cannot be Empty"

}
{
"message": "minimum password 5 digit"
}
OR
{
"message": "school cannot be null"
}
OR
{
"message": "school cannot be Empty"
}
OR
{
"message": "studentClass cannot be null"
}
OR
{
"message": "studentClass cannot be Empty"
}
OR
{
"message": "isSubscribed cannot be null"
}
OR
{
"message": "isSubscribed cannot be Empty"
}

2. POST /login

Request:

body:
{
"email": "string",
"password": "string"
}
Response (200 - OK)

{
"access_token": "string"
}

Response (400 - Bad Request)
{
"message": "email/password required"
}

Response (401 - Unauthorized)

{
"message": "email/password incorrect"
}

3. POST /sign-in

Request:

Description:

Get token from google an proses for register(if not registed) and login (if registed)

4. PATCH / subscription
   Request:

headers:
{
"token"= "string (required)"
}


Responce (200 - OK)
{
message:"user can accses All fiture"
}

5. POST / generate-midtrans-token
   Request:

headers:
{
"token"= "string (required)"
}


Responce (201 - Created)
{
    "token": "7299cf15-35d8-4b6a-8ae7-a705a74e2224",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection7299cf15-35d8-4b6a-8ae7-a705a74e2224"
}

Response (400 - subscribed)
{
"message": "you're subscribed"
}

6. GET /campuses

Description:

Request :
-

Response (200 - OK)

#example data created
{
    "campuses": [
        {
            "id": 1,
            "namaPTN": "UNIVERSITAS SUMATERA UTARA",
            "idKampus": 1,
            "imageUrl": "https://static.republika.co.id/uploads/member/images/news/hrwumrylig.jpg",
            "createdAt": "2023-03-08T19:55:40.088Z",
            "updatedAt": "2023-03-08T19:55:40.088Z"
        },...
      ]
        "limit": 8,
    "offset": 0,
    "count": 38
}


7. GET /campuses/:id


Request:

params:
{
"id": "integer (required)"
}
Response (200 - OK)
[
    {
        "id": 1,
        "kode": 1211015,
        "jurusan": "PENDIDIKAN DOKTER",
        "NRM": 720,
        "PTN": 1,
        "jenjang": "S1",
        "jenis": "SAINTEK",
        "dayaTampung": 76,
        "pendaftar": 2186,
        "portofolio": "Tidak Ada",
        "createdAt": "2023-03-08T19:55:40.090Z",
        "updatedAt": "2023-03-08T19:55:40.090Z",
        "Campus": {
            "id": 1,
            "namaPTN": "UNIVERSITAS SUMATERA UTARA",
            "idKampus": 1,
            "imageUrl": "https://static.republika.co.id/uploads/member/images/news/hrwumrylig.jpg",
            "createdAt": "2023-03-08T19:55:40.088Z",
            "updatedAt": "2023-03-08T19:55:40.088Z"
        }
    },
    ....
]

Response (404 - Not Found)

{
"message": "Data not found"
}

8. GET /exams/:id

Description:

Request:

params:
{
"id": "integer (required)"
}
Response (200 - OK)
{
    "id": 1,
    "kode": 1211015,
    "jurusan": "PENDIDIKAN DOKTER",
    "NRM": 720,
    "PTN": 1,
    "jenjang": "S1",
    "jenis": "SAINTEK",
    "dayaTampung": 76,
    "pendaftar": 2186,
    "portofolio": "Tidak Ada",
    "createdAt": "2023-03-08T19:55:40.090Z",
    "updatedAt": "2023-03-08T19:55:40.090Z",
    "Campus": {
        "id": 1,
        "namaPTN": "UNIVERSITAS SUMATERA UTARA",
        "idKampus": 1,
        "imageUrl": "https://static.republika.co.id/uploads/member/images/news/hrwumrylig.jpg",
        "createdAt": "2023-03-08T19:55:40.088Z",
        "updatedAt": "2023-03-08T19:55:40.088Z"
    }
}

Response (404 - Not Found)

{
"message": "Data not found"
}

9. GET /campuses/invitees/:id

Description:

Request:

headers:
{
"token"= "string (required)"
}

params:
{
"id": "integer (required)"
}
Response (200 - OK)
[
    {
        "id": 181,
        "jurusan": "FAKULTAS ILMU DAN TEKNOLOGI KEBUMIAN",
        "IdUniversitas": 10,
        "nilai": 91,
        "createdAt": "2023-03-08T19:55:40.091Z",
        "updatedAt": "2023-03-08T19:55:40.091Z",
        "Campus": {
            "id": 10,
            "namaPTN": "INSTITUT TEKNOLOGI BANDUNG",
            "idKampus": 10,
            "imageUrl": "https://www.itb.ac.id/files/dokumentasi/1618210624-DSC_8353.JPG",
            "createdAt": "2023-03-08T19:55:40.088Z",
            "updatedAt": "2023-03-08T19:55:40.088Z"
        }
    },
    {
        "id": 182,
        "jurusan": "FAKULTAS MATEMATIKA DAN ILMU\nPENGETAHUAN  ALAM (FMIPA)",
        "IdUniversitas": 10,
        "nilai": 89,
        "createdAt": "2023-03-08T19:55:40.091Z",
        "updatedAt": "2023-03-08T19:55:40.091Z",
        "Campus": {
            "id": 10,
            "namaPTN": "INSTITUT TEKNOLOGI BANDUNG",
            "idKampus": 10,
            "imageUrl": "https://www.itb.ac.id/files/dokumentasi/1618210624-DSC_8353.JPG",
            "createdAt": "2023-03-08T19:55:40.088Z",
            "updatedAt": "2023-03-08T19:55:40.088Z"
        }
    },
    ...
]

Response (404 - Not Found)

{
"message": "Data not found"
}

10. GET /favourites

Request:
headers:
{
"token"= "string (required)"
}

body:
{
"name": "string",
}

Response (201 - Created)
[
    {
        "id": 1,
        "UserId": 1,
        "CampusId": 108,
        "createdAt": "2023-03-09T00:41:54.682Z",
        "updatedAt": "2023-03-09T00:41:54.682Z",
        "Exam": {
            "id": 108,
            "kode": 1311086,
            "jurusan": "TEKNOLOGI HASIL PERIKANAN",
            "NRM": 560,
            "PTN": 3,
            "jenjang": "S1",
            "jenis": "SAINTEK",
            "dayaTampung": 64,
            "pendaftar": 129,
            "portofolio": "Tidak Ada",
            "createdAt": "2023-03-08T19:55:40.090Z",
            "updatedAt": "2023-03-08T19:55:40.090Z",
            "Campus": {
                "id": 3,
                "namaPTN": "UNIVERSITAS RIAU",
                "idKampus": 3,
                "imageUrl": "https://www.riauonline.co.id/foto/bank/images2/Universitas-Negeri-Riau2.jpg",
                "createdAt": "2023-03-08T19:55:40.088Z",
                "updatedAt": "2023-03-08T19:55:40.088Z"
            }
        }
    },
    ...
]

Response (404 - Not Found)

{
"message": "Data not found"
}

11. POST /favourites/:examId

Request:
headers:
{
"token"= "string (required)"
}

params:
{
"CampusId": "string",
}
Response (201 - Created)
}
message: "favourites created"
}

Response (404 - Not Found)

{
"message": "Data not found"
}


12. DELETE /favourites/:id

Description:

before delete authentification and authorization for id and role to action Delete movie by id

Request:

headers:
{
"token"= "string (required)"
}

params:
{
"id": "integer (required)"
}
Response (200 - OK)

{
"message": "Favourite success to delete"
}
Response (404 - Not Found)

{
"message": "product not found"
}

13. POST /tests/:InviteeId

Request:

params:
{
"id": "integer (required)"
}

body:
{
"mat": "integer",
"fis": "integer",
"kim": "integer",
"bio": "integer",
"bind": "integer"
"bing": "integer"
}
Response (201 - Created)

{
massage:"Selamat nilai anda di atas NRM"
}

14. GET /users
Request:
headers:
{
"token"= "string (required)"
}

body:
{
"name": "string",
}

Response (201 - Created)

{
    "id": 1,
    "name": "malik",
    "email": "a@gmail.com",
    "password": "$2a$08$pOq7uecFHthM93jakqkoQeuDwsVisYZwmZ8hpl7AFqPEpWEl2HOL.",
    "school": "SMA 1 DONG",
    "studentClass": 12,
    "isSubscribed": "false",
    "createdAt": "2023-03-09T00:05:39.003Z",
    "updatedAt": "2023-03-09T00:05:39.003Z"
}

Global Error

Response (401 - Unauthorized/JsonWebTokenError)

{
  "message": "Invalid token"
}


Response (500 - Internal Server Error)

{
  "message": "ISE"
}



