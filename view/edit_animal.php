<?php

$id = $animal->id;
$apodo = $animal->apodo;
$patas = $animal->patas;
$color = $animal->color;
$activo = $animal->activo;
$img_url = $animal->img_url;

?>
<?php
$options_array = array('default.png');
if(isset($img_url_options_array)){
    $options_array = $img_url_options_array;
}
?>
<h3> Edit Animal </h3>
<form action='index.php?section=edit_animal' method='POST' class='edit_menu'>
    <input type='hidden' name='id_animal' value='<?php echo $animal->id; ?>'>
    <h3>Edit "<?php echo $apodo; ?>" con ID <?php echo $id; ?></h3>
    <label for='apodo'>Apodo:</label>
    <input type='text' name='apodo' value='<?php echo $apodo; ?>'>
    <label for='patas'>Número de Patas:</label>
    <input type='number' name='patas' value='<?php echo $patas; ?>'>
    <label for='color'>Color:</label>
    <input type='color' name='color' value='<?php echo $color; ?>'>
    <label for='activo'>Activo:</label>
    <input type='number' name='activo' value='<?php echo $activo; ?>'>
    <label for='img_url'>Imagen</label>
    <select name="img_url">
        <?php
        foreach ($options_array as $option){
            $selected = "";
            if("client/img/".$option == $img_url || count($options_array) == 1){
                $selected = "selected";
            }
            echo "<option value=".$option." ".$selected.">".$option."</option>";
        }
        ?>
    </select>
    <div class="form_submit_options">
        <button class='icon_title' type='submit' name='action' value='edit_animal_form'>Enviar</button>
        <button class='icon_title' type='submit' name='cancel' value='cancel'>Cancelar</button>
    </div>
</form>