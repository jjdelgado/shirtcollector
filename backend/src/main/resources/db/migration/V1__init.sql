-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handle VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- TEAMS (CLUB or NATION)
-- =========================
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_type VARCHAR(6) NOT NULL, -- CLUB || NATION
    alias VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT teams_team_type_check CHECK (team_type IN ('CLUB', 'NATION'))
);

CREATE INDEX idx_teams_type_country ON teams(team_type, country);

-- =========================
-- SHIRTS (catalogue)
-- =========================
CREATE TABLE shirts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
    season VARCHAR(20) NOT NULL,
    type VARCHAR(10) NOT NULL,
    sleeve VARCHAR(5) NOT NULL,
    authenticity VARCHAR(8) NOT NULL,
    brand VARCHAR(30) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT shirts_sleeve_check CHECK (sleeve IN ('SHORT', 'LONG')),
    CONSTRAINT shirts_type_check CHECK (type IN ('HOME', 'AWAY', 'THIRD', 'GK', 'FESTIVE', 'OTHER')),
    CONSTRAINT shirts_authenticity_check CHECK (authenticity IN ('OFFICIAL', 'REPLICA')),
    CONSTRAINT shirts_unique UNIQUE (team_id, season, type, sleeve, authenticity, brand)
);

CREATE INDEX idx_shirts_team ON shirts(team_id);

-- =========================
-- USER SHIRTS (collection)
-- =========================
CREATE TABLE user_shirts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shirt_id UUID NOT NULL REFERENCES shirts(id) ON DELETE RESTRICT,
    player_name VARCHAR(50),
    player_number INTEGER,
    match_worn BOOLEAN NOT NULL DEFAULT FALSE,
    match_date DATE,
    match_notes TEXT,
    acquired_at DATE,
    condition VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_shirts_user ON user_shirts(user_id);
CREATE INDEX idx_user_shirts_shirt ON user_shirts(shirt_id);
CREATE INDEX idx_user_shirts_user_shirt ON user_shirts(user_id, shirt_id);