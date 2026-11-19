-- Ideas sent from the "Punya ide sendiri?" form.
create table ideas (
  id integer primary key autoincrement,
  idea text not null,
  name text,
  contact text not null,
  created_at text not null default (datetime('now'))
);

-- Emails from the "Mau jadi yang pertama coba?" form.
create table subscribers (
  id integer primary key autoincrement,
  email text not null unique,
  created_at text not null default (datetime('now'))
);
