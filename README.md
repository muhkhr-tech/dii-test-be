## Fitur Manajemen User

### GET Users API

Endpoint : GET /api/users

Headers: Bearer <token>

Response Body Success :

```json
[
    {
        "id": 1,
        "username": "admin",
        "password": "$2b$10$QwZjEyiyBMvXnUXzBt9IR.QQn.HunoWqWXzyUWcwhGZ8I97LtfxWe",
        "name": "Admin",
        "status": "active",
        "createdAt": "2025-07-02T01:36:51.745Z",
        "updatedAt": "2025-07-02T01:36:51.745Z"
    },
    {
        "id": 2,
        "username": "dokterandi",
        "password": "$2b$10$nd7BxhyU8s2k8NBgtf5YsOBdSj8.IpCgmX8BeIeWtSgoCl89nEYEW",
        "name": "dr. Andi Wijaya",
        "status": "active",
        "createdAt": "2025-07-02T02:07:02.270Z",
        "updatedAt": "2025-07-02T02:07:02.270Z"
    }
]
```

### GET User By ID API

Endpoint : GET /api/users/:user_id

Headers: Bearer <token>

Response Body Success :

```json
{
    "id": 1,
    "username": "admin",
    "password": "$2b$10$QwZjEyiyBMvXnUXzBt9IR.QQn.HunoWqWXzyUWcwhGZ8I97LtfxWe",
    "name": "Admin",
    "status": "active",
    "createdAt": "2025-07-02T01:36:51.745Z",
    "updatedAt": "2025-07-02T01:36:51.745Z"
}
```

### Create User API

Endpoint : POST /api/users

Headers: Bearer <token>

Request Body :

```json
{
    "name": "dr. Andi Wijaya",
	"username": "dokterandi",
    "password": "dokterandi123"
}
```

Response Body Success :

```json
{
    "message": "Berhasil membuat user baru",
    "user": {
        "id": 2,
        "username": "dokterandi",
        "name": "dr. Andi Wijaya"
    }
}
```

### Update User API

Endpoint : PUT /api/users/:id

Headers: Bearer <token>

Request Body :

```json
{
    "name": "dr. Andi Wijaya Kusuma",
	"username": "dokterandi"
}
```

Response Body Success :

```json
{
    "message": "Berhasil mengubah user",
    "user": {
        "username": "dokterandi",
        "name": "dr. Andi Wijaya Kusuma"
    }
}
```

### Delete User API

Endpoint : DELETE /users/:id

Headers: Bearer <token>

Response Body Success :

```json
{
    "message": "User berhasil dihapus"
}
```

## Fitur Otentikasi

### Login User API

Endpoint : POST /api/auth/login

Request Body :

```json
{
	"username": "admin",
    "password": "admin"
}
```

Response Body Error (Username) :

```json
{
    "message": "User tidak ditemukan"
}
```

Response Body Error (Password) :

```json
{
    "message": "Password salah!"
}
```

Response Body Success (Tidak/belum ada Role) :

```json
{
    "message": "Login berhasil",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRva3RlcmFuZGkiLCJpYXQiOjE3NTE0MjIzNDl9.c4foLFfKNbtj-3q8G0itDIPiAV6ZnvXM1s6Y3ahTAPk",
    "user": {
        "id": 3,
        "username": "dokterandi",
        "name": "dr. Andi Wijaya",
        "role": []
    }
}
```

Response Body Success (Role lebih dari 1) :

```json
{
    "message": "User memiliki beberapa role. Silakan pilih salah satu.",
    "roles": [
        1,
        2
    ],
    "redirect": "/choose-user-role",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6WzEsMl0sImlhdCI6MTc1MTQyMjI3OH0.aIvUp58JWgPHNn_j0tNl-IHhx3c96_GSxTyMjNBneF4",
    "user": {
        "id": 1,
        "username": "admin",
        "name": "Admin"
    }
}
```

Response Body Success :

```json
{
    "message": "Login berhasil",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6MSwiaWF0IjoxNzUxNDIwNjA2fQ.E_46CStgKiEonLy-1Fi1aSXMGDhNHcGx6XtL80HmIqA",
    "user": {
        "id": 1,
        "username": "admin",
        "name": "Admin",
        "role": [
            1
        ]
    }
}
```

### Pilih User Role API

Endpoint : POST /api/auth/choose-user-role

Headers: Bearer <token>

Request Body :

```json
{
    "role": 1
}
```

Response Body Error :

```json
{
    "message": "Role tidak ditemukan"
}
```

Response Body Success (Jika API diakses lagi setelah berhasil memilih role) :

```json
{
    "message": "Anda sudah memilih role"
}
```

Response Body Success :

```json
{
    "message": "Berhasil memilih role",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6MSwiaWF0IjoxNzUxNDIzNzEyfQ.V3F5Xpq_MObqtNbR3QpPgOKkptO7dbT6gOU_0SmFRsk"
}
```

## Fitur CRUD Role

### Create Role API

Endpoint : POST /api/roles

Request Body :

```json
{
    "name": "Admin"
}
```

Response Body Success :

```json
{
    "message": "Role berhasil ditambah"
}
```

### Get Role API

Endpoint : GET /api/roles

Headers: Bearer <token>

Response Body Success :

```json
[
    {
        "id": 1,
        "name": "Admin",
        "createdAt": "2025-07-02T01:39:02.637Z",
        "updatedAt": "2025-07-02T01:39:02.637Z"
    },
    {
        "id": 2,
        "name": "Dokter",
        "createdAt": "2025-07-02T02:04:04.023Z",
        "updatedAt": "2025-07-02T02:04:04.023Z"
    },
    {
        "id": 3,
        "name": "Perawat",
        "createdAt": "2025-07-02T02:04:08.802Z",
        "updatedAt": "2025-07-02T02:04:08.802Z"
    }
]
```

## Fitur CRUD Menu

### Create Menu API

Endpoint : POST /api/menu

Headers: Bearer <token>

Request Body :

```json
[
  { "name": "Menu 1", "path": "/menu1" },
  { "name": "Menu 1.1", "path": "/menu1.1", "parentId": 1 },
  { "name": "Menu 1.2", "path": "/menu1.2", "parentId": 1 },
  { "name": "Menu 1.2.1", "path": "/menu1.2.1", "parentId": 3 },
  { "name": "Menu 1.2.2", "path": "/menu1.2.2", "parentId": 3 },
  { "name": "Menu 1.3", "path": "/menu1.3", "parentId": 1 },
  { "name": "Menu 1.3.1", "path": "/menu1.3.1", "parentId": 6 },

  { "name": "Menu 2", "path": "/menu2" },
  { "name": "Menu 2.1", "path": "/menu2.1", "parentId": 8 },
  { "name": "Menu 2.2", "path": "/menu2.2", "parentId": 8 },
  { "name": "Menu 2.2.1", "path": "/menu2.2.1", "parentId": 10 },
  { "name": "Menu 2.2.2", "path": "/menu2.2.2", "parentId": 10 },
  { "name": "Menu 2.2.2.1", "path": "/menu2.2.2.1", "parentId": 12 },
  { "name": "Menu 2.2.2.2", "path": "/menu2.2.2.2", "parentId": 12 },
  { "name": "Menu 2.2.3", "path": "/menu2.2.3", "parentId": 10 },
  { "name": "Menu 2.3", "path": "/menu2.3", "parentId": 8 },

  { "name": "Menu 3", "path": "/menu3" },
  { "name": "Menu 3.1", "path": "/menu3.1", "parentId": 17 },
  { "name": "Menu 3.2", "path": "/menu3.2", "parentId": 17 }
]

```

Response Body Success :

```json
{
    "message": "Menu berhasil ditambah"
}
```

### Get Menu API

Endpoint : GET /api/menu

Headers: Bearer <token>

Response Body Success :

```json
[
    {
        "id": 1,
        "name": "Menu 1",
        "path": "/menu1",
        "parentId": null,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 2,
        "name": "Menu 1.1",
        "path": "/menu1.1",
        "parentId": 1,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 3,
        "name": "Menu 1.2",
        "path": "/menu1.2",
        "parentId": 1,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 4,
        "name": "Menu 1.2.1",
        "path": "/menu1.2.1",
        "parentId": 3,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 5,
        "name": "Menu 1.2.2",
        "path": "/menu1.2.2",
        "parentId": 3,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 6,
        "name": "Menu 1.3",
        "path": "/menu1.3",
        "parentId": 1,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 7,
        "name": "Menu 1.3.1",
        "path": "/menu1.3.1",
        "parentId": 6,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 8,
        "name": "Menu 2",
        "path": "/menu2",
        "parentId": null,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 9,
        "name": "Menu 2.1",
        "path": "/menu2.1",
        "parentId": 8,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 10,
        "name": "Menu 2.2",
        "path": "/menu2.2",
        "parentId": 8,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 11,
        "name": "Menu 2.2.1",
        "path": "/menu2.2.1",
        "parentId": 10,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 12,
        "name": "Menu 2.2.2",
        "path": "/menu2.2.2",
        "parentId": 10,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 13,
        "name": "Menu 2.2.2.1",
        "path": "/menu2.2.2.1",
        "parentId": 12,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 14,
        "name": "Menu 2.2.2.2",
        "path": "/menu2.2.2.2",
        "parentId": 12,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 15,
        "name": "Menu 2.2.3",
        "path": "/menu2.2.3",
        "parentId": 10,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 16,
        "name": "Menu 2.3",
        "path": "/menu2.3",
        "parentId": 8,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 17,
        "name": "Menu 3",
        "path": "/menu3",
        "parentId": null,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 18,
        "name": "Menu 3.1",
        "path": "/menu3.1",
        "parentId": 17,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    },
    {
        "id": 19,
        "name": "Menu 3.2",
        "path": "/menu3.2",
        "parentId": 17,
        "createdAt": "2025-07-02T01:41:48.072Z",
        "updatedAt": "2025-07-02T01:41:48.072Z"
    }
]
```

## Fitur Manajemen Akses Role

### Update Role User Akses API

Endpoint : PUT /api/users/roles

Request Body :

```json
[
    {
        "userId": 1,
        "roleId": 1
    },
    {
        "userId": 1,
        "roleId": 2
    }
]
```

Response Body Success :

```json
{
    "message": "User role berhasil diupdate"
}
```

### Get Role User Akses API

Endpoint : PUT /api/users/:user_id/roles

Headers: Bearer <token>

Response Body Success :

```json
[
    {
        "id": 2,
        "userId": 1,
        "roleId": 1
    },
    {
        "id": 3,
        "userId": 1,
        "roleId": 2
    }
]
```

## Fitur Manajemen Akses Menu

### Update Menu Akses API

Endpoint : PUT /api/role-menu-access

Headers: Bearer <token>

Request Body :

```json
[
  // Admin (roleId: 1)
  { "menuId": 1, "roleId": 1 },
  { "menuId": 2, "roleId": 1 },
  { "menuId": 3, "roleId": 1 },
  { "menuId": 4, "roleId": 1 },
  { "menuId": 5, "roleId": 1 },
  { "menuId": 6, "roleId": 1 },
  { "menuId": 7, "roleId": 1 },
  { "menuId": 8, "roleId": 1 },
  { "menuId": 9, "roleId": 1 },
  { "menuId": 10, "roleId": 1 },
  { "menuId": 11, "roleId": 1 },
  { "menuId": 12, "roleId": 1 },
  { "menuId": 13, "roleId": 1 },
  { "menuId": 14, "roleId": 1 },
  { "menuId": 15, "roleId": 1 },
  { "menuId": 16, "roleId": 1 },
  { "menuId": 17, "roleId": 1 },
  { "menuId": 18, "roleId": 1 },
  { "menuId": 19, "roleId": 1 },

  // Dokter (roleId: 2)
  { "menuId": 1, "roleId": 2 },
  { "menuId": 2, "roleId": 2 },

  // Perawat (roleId: 3)
  { "menuId": 17, "roleId": 3 }
]
```

Response Body Success :

```json
{
    "message": "Role menu akses berhasil diupdate"
}
```

### Get Menu Akses API

Endpoint : GET /api/role-menu-access

Headers: Bearer <token>

Response Body Success :

```json
[
    {
        "id": 17,
        "name": "Menu 3",
        "path": "/menu3",
        "parentId": null,
        "children": [
            {
                "id": 18,
                "name": "Menu 3.1",
                "path": "/menu3.1",
                "parentId": 17,
                "children": []
            },
            {
                "id": 19,
                "name": "Menu 3.2",
                "path": "/menu3.2",
                "parentId": 17,
                "children": []
            }
        ]
    }
]
```