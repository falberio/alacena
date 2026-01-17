// src/controllers/auth.controller.js

const prisma = require('../prisma/client.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

async function register(req, res) {
    try {
        const { email, password, name } = req.body

        // Validaciones básicas
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' })
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' })
        }

        // Hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                email,
                name: name || email.split('@')[0],
                passwordHash,
            },
            select: { id: true, email: true, name: true }
        })

        // Generar token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user,
            token
        })
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({ error: 'Error al registrar usuario', message: error.message })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        // Validaciones
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' })
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user || !user.isActive) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        // Generar token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Error al iniciar sesión', message: error.message })
    }
}

async function getProfile(req, res) {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({ error: 'No autorizado' })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true, isActive: true }
        })

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        res.json(user)
    } catch (error) {
        console.error('Profile error:', error)
        res.status(500).json({ error: 'Error al obtener perfil', message: error.message })
    }
}

module.exports = {
    register,
    login,
    getProfile
}
