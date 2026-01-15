// Lancer l'auth Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback après login Google
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/admin'); // redirige vers ton admin
    }
);

// Déconnexion
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Middleware pour protéger la page admin
function isAdmin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

// Page admin
app.get('/admin', isAdmin, (req, res) => {
    res.send('<h1>Bienvenue Admin 👑</h1><p>Liste des demandes ici…</p>');
});
