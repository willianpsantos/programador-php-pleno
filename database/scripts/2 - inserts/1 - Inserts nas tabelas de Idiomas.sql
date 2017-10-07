INSERT INTO `textos` (`nm_texto`) VALUES ('IDIOMA-PORTUGUES');
INSERT INTO `textos` (`nm_texto`) VALUES ('IDIOMA-ESPANHOL');
INSERT INTO `textos` (`nm_texto`) VALUES ('IDIOMA-INGLES');

INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (1, 'pt', 'Português');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (1, 'es', 'Portugues');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (1, 'en', 'Portuguese');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (2, 'pt', 'Espanhol');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (2, 'es', 'Español');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (2, 'en', 'Spanish');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (3, 'pt', 'Ingês');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (3, 'es', 'Ingles');
INSERT INTO `texto_idiomas` (`idtexto`, `idioma`, `texto`) VALUES (3, 'en', 'English');

insert into idiomas(sigla, nm_idioma, icon_flag_css, idtexto) values('pt', 'Português', 'flag-icon flag-icon-br', 1);
insert into idiomas(sigla, nm_idioma, icon_flag_css, idtexto) values('es', 'Espanhol', 'flag-icon flag-icon-es', 2);
insert into idiomas(sigla, nm_idioma, icon_flag_css, idtexto) values('en', 'Inglês', 'flag-icon flag-icon-us', 3);