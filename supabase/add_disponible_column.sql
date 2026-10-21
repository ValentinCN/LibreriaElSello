-- Migration: columna disponible (Fase 2B — toggle disponible/agotado)
-- Correr a mano en el SQL Editor de Supabase (igual que products_write_policies.sql).
-- Disponibilidad manual sí/no, sin cantidades. Policy UPDATE authenticated ya
-- existente cubre esta columna (misma tabla products) — no hace falta policy nueva.

alter table products add column disponible boolean not null default true;
