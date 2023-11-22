<?php
    class DBCAnimales extends DBC{
        public static $IMG_URL_OPTIONS = null;
        public static function getImg_url_options(){
            if(self::$IMG_URL_OPTIONS == null){
                $options_array = array();
                $dbc = DBC::getNewConnection();
                if(!$dbc){ return null; }

                $result=$dbc->sql_query('select distinct img_url from options');
                while (($fila = mysqli_fetch_array($result)) != null) {
                    $options_array[] = $fila['img_url'];
                }
                self::$IMG_URL_OPTIONS = $options_array;
                $dbc->desconectar();
            }
            return self::$IMG_URL_OPTIONS;
        }
        public static function getAnimalitos($busqueda){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }

            $sql_query = "select * from animales where activo = 1";
            if($busqueda!=''){
                $sql_query = $sql_query." and apodo like '%".$busqueda."%'";
            }
            $result=$dbc->sql_query($sql_query.';');
            $animales = array();
            while (($fila = mysqli_fetch_array($result)) != null) {
                extract($fila); //extraer todas las claves del mapa, y que existan las variables
                $animal = new Animal($id, $apodo, $color, $patas, $sonido, 'client/img/' .$img_url, $activo, $nombre_usuario);
                $animales[] = $animal;
            }
            $dbc->desconectar();
            return $animales;
        }
        public static function misAnimales($nombre_usuario_a_buscar){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $sql_query = "select * from animales where nombre_usuario = '$nombre_usuario_a_buscar'";

            $result=$dbc->sql_query($sql_query);
            $animales = array();
            while (($fila = mysqli_fetch_array($result)) != null) {
                extract($fila);
                $animal = new Animal($id, $apodo, $color, $patas, $sonido, 'client/img/' .$img_url, $activo, $nombre_usuario);
                $animales[] = $animal;
            }
            $dbc->desconectar();
            return $animales;
        }
        
        public static function getAnimalById($id_animal){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $result=$dbc->sql_query("SELECT * from animales WHERE id = ".$id_animal.";");
            $fila = mysqli_fetch_array($result);
            if($fila != null){
                extract($fila);
                return new Animal($id, $apodo, $color, $patas, $sonido, 'client/img/' .$img_url, $activo, $nombre_usuario);
            }
            return null;
        }
        public static function getUsuarioByNombre($nombre){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $result=$dbc->sql_query("SELECT * from usuarios WHERE nombre = '".$nombre."';");
            $fila = mysqli_fetch_array($result);
            if($fila != null){
                extract($fila);
                return new Usuario($id,$nombre);
            }
            return null;
        }
        public static function updateAnimal($animal, $consulta){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }

            $id = $animal->id;
            $apodo = $animal->apodo;
            $patas = $animal->patas;
            $color = $animal->color;
            $activo = $animal->activo;
            $img_url = $animal->img_url;

            if($id > 1 ){ $id = 1; }
            if($id < 0 ){ $id = 0; }
            $sql_query = "UPDATE animales SET apodo = '$apodo', img_url = '$img_url', color = '$color', patas = $patas, activo = $activo WHERE id = $id;";
            $result = $dbc->sql_query($consulta);
            return $result;
        }
        public static function deleteAnimal($id_animal){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $sql_query = "update animales set activo = 0 where id = ".$id_animal.";";
            $result=$dbc->sql_query($sql_query);
            $dbc->desconectar();
            return $result;
        }
        public static function insertAnimal($apodo, $patas, $color, $sonido, $img_url, $nombre_usuario){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $sql_query = "insert into animales (apodo, patas, color, sonido, img_url, nombre_usuario) values ('$apodo','$patas','$color','$sonido','$img_url','$nombre_usuario');";
            $result=$dbc->sql_query($sql_query);
            $dbc->desconectar();
            return $result;
        }
        public static function resetAnimalitos(){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $result=$dbc->sql_query("update animales set activo = 1");
            $dbc->desconectar();
            return $result;
        }
        public static function newUsuario($user,$pass){
            $dbc = DBC::getNewConnection();
            if(!$dbc){ return null; }
            $result=$dbc->sql_query("insert into usuarios (nombre, pass) values ('$user', md5('$pass'));");
            if($result == true){
                $consultar_nuevo_usuario = $dbc->sql_query("SELECT * from usuarios WHERE nombre = '".$user."' and pass = md5('".$pass."');");
                $fila = mysqli_fetch_array($consultar_nuevo_usuario);
                if($fila != null){
                    extract($fila);
                    $result = new Usuario($id,$nombre);
                }
            } 
            $dbc->desconectar();
            return $result;
        }
    }
?>