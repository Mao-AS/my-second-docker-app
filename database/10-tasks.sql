CREATE TABLE IF NOT EXISTS tasks
(
    id           BIGSERIAL PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    description  TEXT,
    status       TEXT         NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
    due_at       TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CHECK (char_length(title) BETWEEN 1 AND 200),
    CHECK (completed_at IS NULL OR status = 'done')
);

CREATE INDEX IF NOT EXISTS idx_tasks_status_due ON tasks (status, due_at);
