<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\buyHouseCatagory;
use vendor\page\Page;
class buyHouseCatagoryCtrl extends baseCtrl{
    public $db;
    public $id;
    public $pid;
    // 构造方法
    public function _auto(){
        $this->db = new buyHouseCatagory();
        $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $this->pid = isset($_GET['pid']) ? intval($_GET['pid']) : 0;
    }

    // 添加房类别页面
    public function add(){
        // Get
        if (IS_GET === true) {
            // id
            if ($this->id) {
                // 获取单条数据
                $data = $this->db->getInfo($this->id);
                if (!file_exists(ICUNJI.$data['icon_path'])) {
                    $data['icon_path'] = '';
                }
                // assign
                $this->assign('data',$data);
            }
            if($this->pid){
                $data['pcname']=$this->db->getInfo($this->pid)['cname'];
                $data['pid']=$this->pid;
                $this->assign('data',$data);
                  var_dump($data);
            }
            // display
            $this->display('buyHouseCatagory','add.html');
            die;
        }
        // Ajax
        if (IS_AJAX === true) {
            // data
            $data = $this->getData();
            // id
            if($this->pid){
                // 写入数据表,添加的下一级
                $res = $this->db->add($data);
                echo json_encode(true);
                die;
            }
            if ($this->id) {
                $res = $this->db->save($this->id,$data);
            } else {
                // 写入数据表
                $res = $this->db->add($data);
            }
            if ($res) {
                echo json_encode(true);
                die;
            } else {
                echo json_encode($data);
                die;
            }
        }
    }

    // 初始化数据
    private function getData(){
        // data
        $data = array();
        // ipPath
        $ipPath = isset($_POST['ipPath']) ? $_POST['ipPath'] : '';
        if (!$ipPath) {
            $res = upFiles('icon_path');
            if ($res['error'] == 1) {
                echo json_encode($res['msg']);
                die;
            } else {
                $data['icon_path'] = $res['filepath'];
            }
        } else {
            $data['icon_path'] = $ipPath;
        }
        $data['cname'] = htmlspecialchars($_POST['cname']);
        $data['pid']=$this->db->sel_pid(htmlspecialchars($_POST['pcname']));
        unset($_POST['pcname']);
        $data['sort'] = intval($_POST['sort']);
        $data['status'] = 0;
        return $data;
    }

    // 房类别列表页面
    public function index(){
        // search
        $search = isset($_POST['search']) ? htmlspecialchars($_POST['search']) : '';
        // 总记录数
        $cou = $this->db->cou();
        // 数据分页
        $page = new Page($cou,conf::get('LIMIT','admin'));
        // 结果集
        $data = $this->db->sel($search,$page->limit);
        // assign
        $this->assign('data',$data);
        $this->assign('page',$page->showpage());
        // display

        $this->display('buyHouseCatagory','index.html');
        die;
    }

    // 修改密码
    public function ePass(){
        // Ajax
        if (IS_AJAX === true) {
            // password
            $password = enPassword(htmlspecialchars($_POST['password']));
            // update
            $res = $this->db->ePass($this->id,$password);
            if ($res) {
                echo json_encode(true);
                die;
            } else {
                echo json_encode(false);
                die;
            }
        }
    }

    // flag
    public function flag(){
        // Ajax
        if (IS_AJAX === true) {
            // status
            $status = intval($_POST['status']);
            // update
            $res = $this->db->upStatus($this->id,$status);
            if ($res) {
                echo json_encode(true);
                die;
            } else {
                echo json_encode(false);
                die;
            }
        }
    }

    // del
    public function del(){
        // Ajax
        if (IS_AJAX === true) {
            // delete
            $res = $this->db->del($this->id);
            if ($res) {
                echo json_encode(true);
                die;
            } else {
                echo json_encode(false);
                die;
            }
        }
    }
}