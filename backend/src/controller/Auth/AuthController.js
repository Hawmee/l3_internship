import prismaClient from "../prismaClient.js";
import bcrypt from "bcrypt";

const prisma = prismaClient;
const salt_round = 10;


export const login = async (req, res) => {
  const { matricule, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        matricule: matricule,
      },
    });

    if (user) {
      const ismatch = await bcrypt.compare(password, user.password);
      if (ismatch) {
        const { password, ...client_user } = user;
        req.session.user = client_user;
        res.send(client_user);
      } else {
        res.send({
          message: "Mot de Passe incorrecte, veuillez le resaisir !",
        });
      }
    } else {
      res.send({
        message:
          "Utilisateur inconnu, veuillez vérifier les informations saisies !",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

export const register = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    status,
    matricule,
    pass_word,
    isChefService,
    isChefUnit,
    isPersCellule,
    isPersSecretariat,
    unite_id,
  } = req.body;

  

  try {
    const hashed_password = await bcrypt.hash(pass_word , salt_round);

    const existing_user = await prisma.users.findUnique({
      where: { matricule: matricule },
    });

    if (existing_user) {
      return res.send({
        message: "Matricule déjà utilisée, veuillez changer la matricule !",
      });
    } 

    const user = await prisma.users.create({
      data: {
        matricule: matricule,
        password: hashed_password,
        nom: nom,
        prenom: prenom,
        email: email,
        status: status,
        isChefService: isChefService,
        isChefUnit: isChefUnit,
        isPersCellule: isPersCellule,
        isPersSecretariat: isPersSecretariat,
        unite_id: unite_id,
      },
    });

    
    const { password, ...client_user } = user;

    req.session.user = client_user;
    req.io.emit("new_user", user);
    res.send(client_user);

    // res.send(user)
  } catch (error) {
    res.send({ messagea: error.message });
  }
};

export const cookie_handling = (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({});
  }
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.clearCookie("user_cookie");
      res.send({ message: "Deconnecté avec succes !" });
    }
  });
};
