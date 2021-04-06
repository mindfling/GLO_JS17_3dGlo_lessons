<?php
    $data = $_GET;
    // $data = $_POST;
    echo "helo get )) " . "Lets GET test";
    print_r($data);

?>


<?php 
if (isset($_GET['page'])) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GET test</title>
    <style>
    * {
        color: #ededed;
    }
    table {
        font-family: 'Arial', sans-serif;
        color: orangered;
    }
    th {
        padding: 2px 25px;
    }
    td {
        padding: 7px 22px;
        color: orangered;
    }
    </style>
</head>
<body>

<br><br><br>
<hr><br>
<p>Make our into table</p>
<table border="1">
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>E-mail</th>
        <th>tel</th>
    </tr>
    <tr>
        <td><?php echo '00';?></td>
        <td><?php echo $data['user_name'];?></td>
        <td><?php echo $data['user_email'];?></td>
        <td><?php echo $data['user_phone'];?></td>
    </tr>
</table>
<br><hr><br>
<img src=" http://placekitten.com/400/302">
</body>
</html>
    <?php
    } else {
    ?>



    




<?php
    }
?>


<?php
?>



<?php ?>


    <!-- <pre>

    <?php
        // echo "<br><br>We need next:<br>";
        // echo $_GET['user_name'] . "<br>";
        // echo $_GET["user_email"] . "<br>";
        // echo $_GET['user_phone'] . "<br>";
        
        // echo "<br><br>ALL $_GET array is:<br>";
        // // var_dump($data);
    ?>

    </pre> -->
<!-- <br><hr>
<pre>
<?php
    // $data = $_GET;
    // // $data = $_POST;
    // echo "helo get )) ";
    // echo "Lets GET test";
    // print_r($data);

    // echo "<br><br>We need next:<br>";
    // echo $_GET['user_name'] . "<br>";
    // echo $_GET["user_email"] . "<br>";
    // echo $_GET['user_phone'] . "<br>";

    // echo "<br><br>ALL $_GET array is:<br>";
    // var_dump($data);

?>
</pre> -->