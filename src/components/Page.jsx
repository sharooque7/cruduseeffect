import { useContext } from "react";
import { Data } from "../store/Data";
import {
  ListGroup,
  ListGroupItem,
  Navbar,
  NavbarBrand,
  Container,
  Button,
  Table,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Form,
  Col,
} from "reactstrap";

//Page component
const Page = () => {
  const {
    post,
    users,
    dropDowns,
    toggle,
    values,
    selectValues,
    title,
    deletePost,
    Body,
    PostId,
    editPost,
    updatePost,
    setTitle,
    setBody,
    createPost,
    comments,
    commentsData,
  } = useContext(Data);

  //Handle Submit for Update and Add Post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (PostId) {
      console.log(PostId);
      updatePost();
    } else {
      createPost();
    }
  };

  //Handle change for edit the Title and Body
  const handleChange = ({ target: { name, value } }) => {
    if (name === "title") {
      setTitle(value);
    }
    if (name === "Body") {
      setBody(value);
    }
  };

  return (
    <>
      <Navbar color="dark" dark>
        <NavbarBrand href="#" style={{ marginLeft: "50%", fontSize: 30 }}>
          Blogs
        </NavbarBrand>
      </Navbar>
      <Container>
        <br></br>
        <Form onSubmit={handleSubmit}>
          {PostId && (
            <>
              <FormGroup row>
                <Label for="title" sm={2}>
                  Post ID
                </Label>
                <Col sm={10}>
                  <input type="text" name="userId" value={PostId} disabled />
                </Col>
              </FormGroup>
            </>
          )}
          <FormGroup row>
            <Label for="users" mb={2} sm={2}>
              User Name
            </Label>

            <Col sm={10}>
              <ButtonDropdown isOpen={dropDowns} toggle={toggle}>
                <DropdownToggle>{values}</DropdownToggle>
                <DropdownMenu>
                  {users.map((user) => {
                    return (
                      <DropdownItem key={user.id} onClick={selectValues}>
                        {user.name}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
          </FormGroup>
          <br></br>
          <FormGroup row>
            <Label for="title" sm={2}>
              Title
            </Label>
            <Col sm={10}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={title}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Body" sm={2}>
              Body
            </Label>
            <Col sm={10}>
              <input
                type="text"
                name="Body"
                onChange={handleChange}
                value={Body}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Button color="secondary" type="submit">
              {PostId ? "Update" : "Add"} Post
            </Button>
          </FormGroup>
        </Form>
        {commentsData.length > 0 ? <h2>List of Comments</h2> : null}
        {commentsData.map((comment) => {
          return (
            <ListGroup key={comment.id}>
              <ListGroupItem style={{ backgroundColor: "#DCDCDC" }}>
                {comment.body}
              </ListGroupItem>
            </ListGroup>
          );
        })}
        <br></br>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserId</th>
              <th>Title</th>
              <th>Body</th>
              <th colSpan="4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {post.map((post) => {
              return (
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => editPost(post)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => comments(post.id)}
                      size="sm"
                    >
                      comments
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Page;
